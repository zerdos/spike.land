import type { Message } from "@spike-npm-land/code";

/**
 * Discriminated union for text content in messages
 */
export interface TextContentPart {
  type: "text";
  text: string;
}

/**
 * Discriminated union for image URL content in messages
 */
export interface ImageUrlContentPart {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "low" | "high" | "auto";
  };
}

/**
 * Discriminated union for image content (binary/base64)
 */
export interface ImageContentPart {
  type: "image";
  image: string;
  mimeType?: string;
}

/**
 * Discriminated union for tool use content (when model calls a tool)
 */
export interface ToolUseContentPart {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
}

/**
 * Discriminated union for tool result content (response from tool execution)
 */
export interface ToolResultContentPart {
  type: "tool_result";
  tool_use_id: string;
  content: string | TextContentPart[];
  is_error?: boolean;
}

/**
 * Union type for all possible message content parts
 */
export type MessageContentPart =
  | TextContentPart
  | ImageUrlContentPart
  | ImageContentPart
  | ToolUseContentPart
  | ToolResultContentPart;

/**
 * Type guard for TextContentPart
 */
export function isTextContentPart(part: unknown): part is TextContentPart {
  return (
    part !== null &&
    typeof part === "object" &&
    "type" in part &&
    part.type === "text" &&
    "text" in part &&
    typeof (part as TextContentPart).text === "string"
  );
}

/**
 * Type guard for ImageUrlContentPart
 */
export function isImageUrlContentPart(part: unknown): part is ImageUrlContentPart {
  return (
    part !== null &&
    typeof part === "object" &&
    "type" in part &&
    part.type === "image_url" &&
    "image_url" in part &&
    typeof (part as ImageUrlContentPart).image_url === "object" &&
    (part as ImageUrlContentPart).image_url !== null &&
    typeof (part as ImageUrlContentPart).image_url.url === "string"
  );
}

/**
 * Type guard for ImageContentPart
 */
export function isImageContentPart(part: unknown): part is ImageContentPart {
  return (
    part !== null &&
    typeof part === "object" &&
    "type" in part &&
    part.type === "image" &&
    "image" in part &&
    typeof (part as ImageContentPart).image === "string"
  );
}

/**
 * Type guard for ToolUseContentPart
 */
export function isToolUseContentPart(part: unknown): part is ToolUseContentPart {
  return (
    part !== null &&
    typeof part === "object" &&
    "type" in part &&
    part.type === "tool_use" &&
    "id" in part &&
    typeof (part as ToolUseContentPart).id === "string" &&
    "name" in part &&
    typeof (part as ToolUseContentPart).name === "string" &&
    "input" in part &&
    typeof (part as ToolUseContentPart).input === "object"
  );
}

/**
 * Type guard for ToolResultContentPart
 */
export function isToolResultContentPart(part: unknown): part is ToolResultContentPart {
  return (
    part !== null &&
    typeof part === "object" &&
    "type" in part &&
    part.type === "tool_result" &&
    "tool_use_id" in part &&
    typeof (part as ToolResultContentPart).tool_use_id === "string" &&
    "content" in part
  );
}

/**
 * Type guard for any MessageContentPart
 */
export function isMessageContentPart(part: unknown): part is MessageContentPart {
  return (
    isTextContentPart(part) ||
    isImageUrlContentPart(part) ||
    isImageContentPart(part) ||
    isToolUseContentPart(part) ||
    isToolResultContentPart(part)
  );
}

/**
 * Tool definition structure for AI SDK tools
 */
export interface ToolDefinition {
  name?: string;
  description?: string;
  input_schema?: JsonSchemaObject;
  custom?: {
    input_schema?: JsonSchemaObject;
    [key: string]: unknown;
  };
}

/**
 * JSON Schema object type (basic subset)
 */
export interface JsonSchemaObject {
  type?: string;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  description?: string;
  [key: string]: unknown;
}

/**
 * JSON Schema property definition
 */
export interface JsonSchemaProperty {
  type?: string;
  description?: string;
  enum?: string[];
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
  [key: string]: unknown;
}

/**
 * Request body structure for POST requests to the AI endpoint
 */
export interface PostRequestBody {
  messages: Message[];
  runConfig?: RunConfig;
  state?: unknown;
  tools?: ToolDefinition[] | Record<string, ToolDefinition>;
  unstable_assistantMessageId?: string;
  model?: string;
  stream?: boolean;
}

/**
 * Run configuration options
 */
export interface RunConfig {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  stopSequences?: string[];
  [key: string]: unknown;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  error: string;
  details?: string;
  code?: string;
}

/**
 * Streaming response chunk types
 */
export interface StreamTextChunk {
  type: "text";
  text: string;
}

export interface StreamToolCallChunk {
  type: "tool_call";
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
}

export interface StreamToolResultChunk {
  type: "tool_result";
  toolCallId: string;
  result: unknown;
}

export interface StreamErrorChunk {
  type: "error";
  error: string;
}

export interface StreamFinishChunk {
  type: "finish";
  finishReason: "stop" | "length" | "tool-calls" | "content-filter" | "error" | "other";
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Union type for all streaming response chunks
 */
export type StreamChunk =
  | StreamTextChunk
  | StreamToolCallChunk
  | StreamToolResultChunk
  | StreamErrorChunk
  | StreamFinishChunk;

/**
 * Default CORS headers for responses
 */
export const DEFAULT_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=UTF-8",
};

/**
 * Preflight CORS headers for OPTIONS requests
 */
export const PREFLIGHT_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

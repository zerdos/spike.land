/**
 * Type definitions for LangChain workflow types
 * These interfaces replace the unsafe Record<string, unknown> casting patterns
 */

import type { AIMessage, BaseMessage } from "@langchain/core/messages";

/**
 * Tool response structure from LangChain AI messages
 */
export interface ToolResponse {
  name: string;
  content: string;
  tool_call_id?: string;
}

/**
 * Additional kwargs that may be present on AI messages
 */
export interface AIMessageAdditionalKwargs {
  tool_responses?: ToolResponse[];
  tool_calls?: unknown[];
}

/**
 * Extended AI message type with properly typed additional_kwargs
 */
export interface TypedAIMessage extends AIMessage {
  additional_kwargs?: AIMessageAdditionalKwargs;
}

/**
 * Configuration for workflow creation
 */
export interface WorkflowConfig {
  modelName: string;
  temperature: number;
  streaming: boolean;
}

/**
 * Default workflow configuration
 */
export const DEFAULT_WORKFLOW_CONFIG: WorkflowConfig = {
  modelName: "claude-sonnet-4-20250514",
  temperature: 0,
  streaming: false,
};

/**
 * Type guard to check if a message has tool responses
 */
export function hasToolResponses(
  additionalKwargs: AIMessageAdditionalKwargs | undefined,
): additionalKwargs is AIMessageAdditionalKwargs & { tool_responses: ToolResponse[]; } {
  return Boolean(
    additionalKwargs?.tool_responses &&
    Array.isArray(additionalKwargs.tool_responses) &&
    additionalKwargs.tool_responses.length > 0,
  );
}

/**
 * Type guard to check if a tool response is an enhanced replace tool response
 */
export function isEnhancedReplaceToolResponse(
  response: ToolResponse,
): boolean {
  return response.name === "enhanced_replace_in_file";
}

/**
 * Model with tools binding interface
 */
export interface ModelWithTools {
  invoke: (messages: BaseMessage[]) => Promise<AIMessage>;
}

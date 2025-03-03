/**
 * This file serves as the main entry point for the chat-langchain workflow.
 * It re-exports the functionality from the original implementation.
 */

import { handleSendMessage, createWorkflowWithStringReplace } from './chat-langchain-workflow';

export {
  handleSendMessage,
  createWorkflowWithStringReplace
};

/**
 * The chat-langchain workflow provides a way to interact with a language model
 * to modify code based on user prompts. It handles:
 * 
 * - Message processing and tool invocation
 * - Code integrity verification
 * - Caching for performance optimization
 * - Error handling and retries
 * 
 * The main components have been organized into separate modules:
 * - message-handlers.ts: Functions for creating and handling messages
 * - code-processing.ts: Functions for code extraction, hashing, and modification
 * - workflow-types.ts: Type definitions for the workflow
 * - state-reducers.ts: State management for the workflow
 * - message-processor.ts: Core message processing logic
 * - workflow-creator.ts: Factory for creating workflow instances
 * 
 * These modules can be used independently if needed, but the main entry point
 * should be the handleSendMessage function exported from this file.
 */

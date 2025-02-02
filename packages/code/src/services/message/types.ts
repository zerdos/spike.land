/**
 * Supported message types in the messaging system
 */
export enum MessageType {
  /** Regular text message */
  TEXT = "text",
  /** Command message for system operations */
  COMMAND = "command",
  /** Status update message */
  STATUS = "status",
  /** Error message */
  ERROR = "error",
}

/**
 * Role of the message sender
 */
export type MessageRole = "user" | "system" | "assistant";

// Re-export essential message types from lib interfaces
export type { ImageUrlPart, Message, MessageContent, TextPart } from "@/lib/interfaces";

/**
 * Response structure for message handling operations
 */
export interface MessageResponse {
  /** Indicates if the operation was successful */
  success: boolean;
  /** Optional data returned from successful operations */
  data?: unknown;
  /** Error message in case of failure */
  error?: string;
}

/**
 * Configuration options for the MessageHandler service
 */
export interface MessageHandlerConfig {
  /** Whether to log errors to console (default: true) */
  logErrors?: boolean;
  /** Maximum number of retries for failed operations (default: 3) */
  maxRetries?: number;
  /** Timeout in milliseconds for operations (default: 5000) */
  timeout?: number;
}

/**
 * Enhanced type definitions with discriminated unions and readonly modifiers
 * for better type safety and immutability
 */

/**
 * Base interface for all message content types
 */
export interface BaseMessageContent {
  readonly type: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly timestamp?: string;
}

/**
 * Text message content
 */
export interface TextMessageContent extends BaseMessageContent {
  readonly type: "text";
  readonly text: string;
}

/**
 * Command message content
 */
export interface CommandMessageContent extends BaseMessageContent {
  readonly type: "command";
  readonly command: string;
  readonly args?: Readonly<Record<string, unknown>>;
}

/**
 * Code execution message content
 */
export interface CodeMessageContent extends BaseMessageContent {
  readonly type: "code";
  readonly code: string;
  readonly language?: string;
  readonly transpiled?: string;
}

/**
 * Error message content
 */
export interface ErrorMessageContent extends BaseMessageContent {
  readonly type: "error";
  readonly error: string;
  readonly code?: string;
  readonly stack?: string;
}

/**
 * HTML/CSS render message content
 */
export interface RenderMessageContent extends BaseMessageContent {
  readonly type: "render";
  readonly html: string;
  readonly css: string;
}

/**
 * Discriminated union of all message content types
 */
export type MessageContent =
  | TextMessageContent
  | CommandMessageContent
  | CodeMessageContent
  | ErrorMessageContent
  | RenderMessageContent;

/**
 * Enhanced message structure with discriminated unions
 */
export interface EnhancedMessage {
  readonly id: string;
  readonly content: MessageContent;
  readonly sender?: string;
  readonly timestamp: string;
}

/**
 * Message error codes for better error categorization
 */
export enum MessageErrorCode {
  INVALID_FORMAT = "INVALID_FORMAT",
  CONTENT_TYPE_MISMATCH = "CONTENT_TYPE_MISMATCH",
  PROCESSING_FAILED = "PROCESSING_FAILED",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  TIMEOUT = "TIMEOUT",
  NETWORK_ERROR = "NETWORK_ERROR",
}

/**
 * Enhanced error class for message handling
 */
export class MessageError extends Error {
  constructor(
    message: string,
    public readonly code: MessageErrorCode,
    public readonly details?: Readonly<Record<string, unknown>>,
  ) {
    super(message);
    this.name = "MessageError";
  }
}

/**
 * Configuration with readonly properties
 */
export interface ReadonlyWebSocketConfig {
  readonly maxRetries: number;
  readonly retryDelay: number;
  readonly connectionTimeout: number;
  readonly reconnectOnError: boolean;
}

/**
 * Session data with readonly properties
 */
export interface ReadonlySessionData {
  readonly id: string;
  readonly codeSpace: string;
  readonly code: string;
  readonly html: string;
  readonly css: string;
  readonly transpiled?: string;
  readonly timestamp: string;
}

/**
 * Type guard for TextMessageContent
 */
export function isTextMessage(content: MessageContent): content is TextMessageContent {
  return content.type === "text";
}

/**
 * Type guard for CommandMessageContent
 */
export function isCommandMessage(content: MessageContent): content is CommandMessageContent {
  return content.type === "command";
}

/**
 * Type guard for CodeMessageContent
 */
export function isCodeMessage(content: MessageContent): content is CodeMessageContent {
  return content.type === "code";
}

/**
 * Type guard for ErrorMessageContent
 */
export function isErrorMessage(content: MessageContent): content is ErrorMessageContent {
  return content.type === "error";
}

/**
 * Type guard for RenderMessageContent
 */
export function isRenderMessage(content: MessageContent): content is RenderMessageContent {
  return content.type === "render";
}

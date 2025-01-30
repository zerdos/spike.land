export enum MessageType {
  TEXT = 'text',
  COMMAND = 'command',
  STATUS = 'status',
  ERROR = 'error',
}

export interface MessageResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface MessageHandlerConfig {
  logErrors?: boolean;
  maxRetries?: number;
  timeout?: number;
}

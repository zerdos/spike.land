// Using built-in MessageEvent type from lib.dom.d.ts

/**
 * Message data structure for WebSocket communication
 */
export interface MessageData {
  /** HTML content of the message */
  html: string;
  /** CSS content of the message */
  css: string;
  /** Optional source code */
  code?: string;
  /** Optional transpiled code */
  transpiled?: string;
}

/**
 * Result structure for run message operations
 */
export interface RunMessageResult {
  /** Generated HTML content */
  html: string;
  /** Generated CSS content */
  css: string;
}

/**
 * Configuration options for WebSocket manager
 */
export interface WebSocketConfig {
  /** Retry attempts for failed connections */
  maxRetries?: number;
  /** Delay between retry attempts in milliseconds */
  retryDelay?: number;
  /** Timeout for connection attempts in milliseconds */
  connectionTimeout?: number;
}

/**
 * Dependencies required by WebSocket manager
 */
export interface WebSocketDependencies {
  /** Message handler service */
  messageHandler: IMessageHandlerService;
  /** Service worker manager */
  serviceWorker: IServiceWorkerManager;
  /** Code session broadcast channel */
  codeSessionBC: ICodeSessionBC;
}

/**
 * Interface for message handler service
 */
export interface IMessageHandlerService {
  /** Handle incoming message */
  handleMessage(event: Message): Promise<MessageResponse>;
  /** Handle run message with transpiled code */
  handleRunMessage(transpiled: string): Promise<RunMessageResult | false>;
  /** Cleanup resources */
  cleanup(): void;
}

/**
 * Interface for service worker manager
 */
export interface IServiceWorkerManager {
  /** Setup service worker */
  setup(): Promise<ServiceWorker | undefined>;
}

/**
 * Interface for code session broadcast channel
 */
export interface ICodeSessionBC {
  /** Initialize broadcast channel */
  init(): Promise<ICodeSession>;
  /** Subscribe to broadcast channel */
  sub(callback: (data: MessageData) => void): () => void;
}

/**
 * Interface for WebSocket manager
 */
export interface IWebSocketManager {
  /** Initialize WebSocket connection */
  init(): Promise<void>;
  /** Handle run message */
  handleRunMessage(transpiled: string): Promise<RunMessageResult | false>;
  /** Cleanup resources */
  cleanup(): void;
}

import { ICodeSession, Message } from "@/lib/interfaces";
import { MessageResponse } from "../message/types";
import { WebSocketEventType } from "./enums";

/**
 * WebSocket event handler type
 */
export type WebSocketEventHandler = (event: MessageEvent | Event) => void;

/**
 * WebSocket event subscription
 */
export interface WebSocketSubscription {
  /** Event type */
  type: WebSocketEventType;
  /** Event handler */
  handler: WebSocketEventHandler;
  /** Unsubscribe function */
  unsubscribe: () => void;
}

/**
 * Re-export enums from separate file
 */
export { WebSocketEventType, WebSocketState } from "./enums";

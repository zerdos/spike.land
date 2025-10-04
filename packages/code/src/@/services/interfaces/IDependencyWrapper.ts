/**
 * Wrapper interface for external dependencies to provide isolation
 * and error handling for third-party libraries
 */

/**
 * Generic error wrapper for dependency failures
 */
export class DependencyError extends Error {
  constructor(
    message: string,
    public readonly dependencyName: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = "DependencyError";
  }
}

/**
 * Storage dependency wrapper interface
 */
export interface IStorageWrapper {
  /**
   * Get item from storage
   * @param key - Storage key
   * @returns Stored value or null
   */
  getItem(key: string): Promise<string | null>;

  /**
   * Set item in storage
   * @param key - Storage key
   * @param value - Value to store
   */
  setItem(key: string, value: string): Promise<void>;

  /**
   * Remove item from storage
   * @param key - Storage key
   */
  removeItem(key: string): Promise<void>;

  /**
   * Clear all items
   */
  clear(): Promise<void>;
}

/**
 * WebSocket dependency wrapper interface
 */
export interface IWebSocketWrapper {
  /**
   * Send message through WebSocket
   * @param data - Data to send
   */
  send(data: string | ArrayBuffer): Promise<void>;

  /**
   * Close WebSocket connection
   * @param code - Close code
   * @param reason - Close reason
   */
  close(code?: number, reason?: string): Promise<void>;

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean;

  /**
   * Get current ready state
   */
  getReadyState(): number;
}

/**
 * BroadcastChannel dependency wrapper interface
 */
export interface IBroadcastChannelWrapper {
  /**
   * Post message to channel
   * @param message - Message to broadcast
   */
  postMessage(message: unknown): Promise<void>;

  /**
   * Subscribe to messages
   * @param handler - Message handler
   * @returns Unsubscribe function
   */
  subscribe(handler: (event: MessageEvent) => void): () => void;

  /**
   * Close the channel
   */
  close(): Promise<void>;
}

/**
 * HTTP client wrapper interface
 */
export interface IHttpClientWrapper {
  /**
   * Perform GET request
   * @param url - Request URL
   * @param options - Request options
   */
  get<T>(url: string, options?: RequestInit): Promise<T>;

  /**
   * Perform POST request
   * @param url - Request URL
   * @param data - Request body
   * @param options - Request options
   */
  post<T>(url: string, data: unknown, options?: RequestInit): Promise<T>;

  /**
   * Perform PUT request
   * @param url - Request URL
   * @param data - Request body
   * @param options - Request options
   */
  put<T>(url: string, data: unknown, options?: RequestInit): Promise<T>;

  /**
   * Perform DELETE request
   * @param url - Request URL
   * @param options - Request options
   */
  delete<T>(url: string, options?: RequestInit): Promise<T>;
}

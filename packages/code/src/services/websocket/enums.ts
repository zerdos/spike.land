/**
 * WebSocket connection states
 */
export enum WebSocketState {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  RECONNECTING = "reconnecting",
  ERROR = "error",
}

/**
 * WebSocket event types
 */
export enum WebSocketEventType {
  MESSAGE = "message",
  ERROR = "error",
  CLOSE = "close",
  OPEN = "open",
}

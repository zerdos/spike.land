import type { WebSocketMessage } from "../src/types";

export interface WebSocketConnection {
  websocket: WebSocket;
  userId: string;
  conversationId: string;
  connectedAt: Date;
  lastActivity: Date;
}

export interface ConnectionInfo {
  userId: string;
  conversationId: string;
  connectedAt: string;
  lastActivity: string;
  isTyping?: boolean;
}

export class WebSocketManager {
  private connections: Map<string, WebSocketConnection> = new Map();
  private typing: Map<string, Set<string>> = new Map(); // conversationId -> Set of userIds
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Start heartbeat check every 30 seconds
    this.startHeartbeat();
  }

  /**
   * Add a new WebSocket connection
   */
  addConnection(
    connectionId: string,
    websocket: WebSocket,
    userId: string,
    conversationId: string,
  ): void {
    const connection: WebSocketConnection = {
      websocket,
      userId,
      conversationId,
      connectedAt: new Date(),
      lastActivity: new Date(),
    };

    this.connections.set(connectionId, connection);

    // Set up event handlers
    websocket.addEventListener("message", (event) => {
      this.handleMessage(connectionId, event);
    });

    websocket.addEventListener("close", () => {
      this.removeConnection(connectionId);
    });

    websocket.addEventListener("error", (error) => {
      console.error(`WebSocket error for connection ${connectionId}:`, error);
      this.removeConnection(connectionId);
    });

    // Send welcome message
    this.sendToConnection(connectionId, {
      type: "presence",
      message: "Connected successfully",
      userId,
      conversationId,
    });

    // Notify others about new connection
    this.broadcastToConversation(conversationId, {
      type: "presence",
      message: `User ${userId} joined the conversation`,
      userId,
      conversationId,
    }, connectionId);

    console.log(
      `WebSocket connection added: ${connectionId} for user ${userId} in conversation ${conversationId}`,
    );
  }

  /**
   * Remove a WebSocket connection
   */
  removeConnection(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      return;
    }

    const { userId, conversationId, websocket } = connection;

    // Remove from typing indicators
    this.setTyping(conversationId, userId, false);

    // Close WebSocket if still open
    if (websocket.readyState === WebSocket.OPEN) {
      websocket.close();
    }

    // Remove from connections
    this.connections.delete(connectionId);

    // Notify others about disconnection
    this.broadcastToConversation(conversationId, {
      type: "presence",
      message: `User ${userId} left the conversation`,
      userId,
      conversationId,
    });

    console.log(`WebSocket connection removed: ${connectionId} for user ${userId}`);
  }

  /**
   * Handle incoming WebSocket message
   */
  private handleMessage(connectionId: string, event: MessageEvent): void {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      return;
    }

    // Update last activity
    connection.lastActivity = new Date();

    try {
      const message: WebSocketMessage = JSON.parse(event.data);

      switch (message.type) {
        case "typing":
          this.handleTypingMessage(connection, message);
          break;
        case "message":
          this.handleChatMessage(connection, message);
          break;
        case "presence":
          this.handlePresenceMessage(connection, message);
          break;
        default:
          console.warn(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error(`Error parsing WebSocket message from ${connectionId}:`, error);
      this.sendError(connectionId, "Invalid message format");
    }
  }

  /**
   * Handle typing indicators
   */
  private handleTypingMessage(connection: WebSocketConnection, message: WebSocketMessage): void {
    const isTyping = message.message === "start";
    this.setTyping(connection.conversationId, connection.userId, isTyping);

    // Broadcast typing status to others in the conversation
    this.broadcastToConversation(
      connection.conversationId,
      {
        type: "typing",
        message: isTyping ? "start" : "stop",
        userId: connection.userId,
        conversationId: connection.conversationId,
      },
      this.getConnectionId(connection),
    );
  }

  /**
   * Handle chat messages (usually just broadcast)
   */
  private handleChatMessage(connection: WebSocketConnection, message: WebSocketMessage): void {
    // Verify the message is for the correct conversation
    if (message.conversationId !== connection.conversationId) {
      this.sendError(this.getConnectionId(connection), "Conversation ID mismatch");
      return;
    }

    // Stop typing indicator
    this.setTyping(connection.conversationId, connection.userId, false);

    // Broadcast message to all connections in the conversation
    this.broadcastToConversation(connection.conversationId, message);
  }

  /**
   * Handle presence messages (user status updates)
   */
  private handlePresenceMessage(connection: WebSocketConnection, message: WebSocketMessage): void {
    // Broadcast presence update to others in the conversation
    this.broadcastToConversation(
      connection.conversationId,
      message,
      this.getConnectionId(connection),
    );
  }

  /**
   * Set typing status for a user in a conversation
   */
  setTyping(conversationId: string, userId: string, isTyping: boolean): void {
    if (!this.typing.has(conversationId)) {
      this.typing.set(conversationId, new Set());
    }

    const typingUsers = this.typing.get(conversationId)!;

    if (isTyping) {
      typingUsers.add(userId);
    } else {
      typingUsers.delete(userId);
    }

    // Clean up empty sets
    if (typingUsers.size === 0) {
      this.typing.delete(conversationId);
    }
  }

  /**
   * Get typing users for a conversation
   */
  getTypingUsers(conversationId: string): string[] {
    const typingUsers = this.typing.get(conversationId);
    return typingUsers ? Array.from(typingUsers) : [];
  }

  /**
   * Send message to a specific connection
   */
  sendToConnection(connectionId: string, message: WebSocketMessage): void {
    const connection = this.connections.get(connectionId);
    if (!connection || connection.websocket.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      connection.websocket.send(JSON.stringify(message));
    } catch (error) {
      console.error(`Error sending message to connection ${connectionId}:`, error);
      this.removeConnection(connectionId);
    }
  }

  /**
   * Send error message to a specific connection
   */
  sendError(connectionId: string, error: string): void {
    this.sendToConnection(connectionId, {
      type: "error",
      error,
    });
  }

  /**
   * Broadcast message to all connections in a conversation
   */
  broadcastToConversation(
    conversationId: string,
    message: WebSocketMessage,
    excludeConnectionId?: string,
  ): void {
    const connectionsToNotify = Array.from(this.connections.entries())
      .filter(([connectionId, connection]) =>
        connection.conversationId === conversationId &&
        connectionId !== excludeConnectionId
      );

    connectionsToNotify.forEach(([connectionId]) => {
      this.sendToConnection(connectionId, message);
    });

    console.log(
      `Broadcasted message to ${connectionsToNotify.length} connections in conversation ${conversationId}`,
    );
  }

  /**
   * Broadcast message to all connections for a specific user
   */
  broadcastToUser(userId: string, message: WebSocketMessage): void {
    const userConnections = Array.from(this.connections.entries())
      .filter(([, connection]) => connection.userId === userId);

    userConnections.forEach(([connectionId]) => {
      this.sendToConnection(connectionId, message);
    });
  }

  /**
   * Get active connections for a conversation
   */
  getConversationConnections(conversationId: string): ConnectionInfo[] {
    return Array.from(this.connections.values())
      .filter(connection => connection.conversationId === conversationId)
      .map(connection => ({
        userId: connection.userId,
        conversationId: connection.conversationId,
        connectedAt: connection.connectedAt.toISOString(),
        lastActivity: connection.lastActivity.toISOString(),
        isTyping: this.getTypingUsers(conversationId).includes(connection.userId),
      }));
  }

  /**
   * Get all active connections for a user
   */
  getUserConnections(userId: string): ConnectionInfo[] {
    return Array.from(this.connections.values())
      .filter(connection => connection.userId === userId)
      .map(connection => ({
        userId: connection.userId,
        conversationId: connection.conversationId,
        connectedAt: connection.connectedAt.toISOString(),
        lastActivity: connection.lastActivity.toISOString(),
        isTyping: this.getTypingUsers(connection.conversationId).includes(userId),
      }));
  }

  /**
   * Get total connection count
   */
  getConnectionCount(): number {
    return this.connections.size;
  }

  /**
   * Get connection statistics
   */
  getStats(): {
    totalConnections: number;
    activeConversations: number;
    typingUsers: number;
  } {
    const activeConversations = new Set(
      Array.from(this.connections.values()).map(conn => conn.conversationId),
    ).size;

    const typingUsers = Array.from(this.typing.values())
      .reduce((total, users) => total + users.size, 0);

    return {
      totalConnections: this.connections.size,
      activeConversations,
      typingUsers,
    };
  }

  /**
   * Clean up inactive connections
   */
  private cleanupInactiveConnections(): void {
    const now = new Date();
    const inactivityThreshold = 5 * 60 * 1000; // 5 minutes

    const inactiveConnections = Array.from(this.connections.entries())
      .filter(([, connection]) =>
        now.getTime() - connection.lastActivity.getTime() > inactivityThreshold
      );

    inactiveConnections.forEach(([connectionId]) => {
      console.log(`Removing inactive connection: ${connectionId}`);
      this.removeConnection(connectionId);
    });
  }

  /**
   * Send heartbeat to all connections
   */
  private sendHeartbeat(): void {
    const heartbeatMessage: WebSocketMessage = {
      type: "presence",
      message: "heartbeat",
    };

    Array.from(this.connections.keys()).forEach(connectionId => {
      this.sendToConnection(connectionId, heartbeatMessage);
    });
  }

  /**
   * Start heartbeat interval
   */
  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    // Send heartbeat every 30 seconds and clean up inactive connections
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
      this.cleanupInactiveConnections();
    }, 30000);
  }

  /**
   * Stop heartbeat interval
   */
  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * Close all connections and cleanup
   */
  destroy(): void {
    this.stopHeartbeat();

    // Close all connections
    Array.from(this.connections.keys()).forEach(connectionId => {
      this.removeConnection(connectionId);
    });

    this.connections.clear();
    this.typing.clear();
  }

  /**
   * Get connection ID for a connection object
   */
  private getConnectionId(connection: WebSocketConnection): string | undefined {
    return Array.from(this.connections.entries())
      .find(([, conn]) => conn === connection)?.[0];
  }
}

// Utility functions for WebSocket message validation
export function validateWebSocketMessage(data: unknown): WebSocketMessage | null {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const message = data as Partial<WebSocketMessage>;

  if (!message.type || typeof message.type !== "string") {
    return null;
  }

  const validTypes = ["message", "typing", "presence", "error"];
  if (!validTypes.includes(message.type)) {
    return null;
  }

  return message as WebSocketMessage;
}

export function createWebSocketMessage(
  type: WebSocketMessage["type"],
  options: Partial<Omit<WebSocketMessage, "type">> = {},
): WebSocketMessage {
  return {
    type,
    ...options,
  };
}

// WebSocket response helpers
export function createWebSocketResponse(accept: boolean = true): Response {
  if (accept) {
    return new Response(null, {
      status: 101,
      headers: {
        "Upgrade": "websocket",
        "Connection": "Upgrade",
      },
    });
  }

  return new Response("WebSocket upgrade failed", { status: 400 });
}

// Connection ID generator
export function generateConnectionId(): string {
  return `ws_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

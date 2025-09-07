import { useCallback, useEffect, useRef, useState } from "react";
import type { Message, WebSocketMessage } from "../../src/types";

interface UseWebSocketOptions {
  onMessage?: (data: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  conversationId?: string;
  userId?: string;
  enabled?: boolean;
}

export function useWebSocket({
  onMessage,
  onConnect,
  onDisconnect,
  conversationId,
  userId,
  enabled = true,
}: UseWebSocketOptions = {}) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(() => {
    if (!enabled) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = conversationId 
      ? `${protocol}//${window.location.host}/ws/${conversationId}`
      : `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
      onConnect?.();
      
      if (userId && conversationId) {
        ws.send(JSON.stringify({
          type: "presence",
          userId,
          conversationId,
        }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);

        switch (message.type) {
          case "typing":
            if (message.userId !== userId) {
              setTypingUsers((prev) => new Set(prev).add(message.userId!));
              setTimeout(() => {
                setTypingUsers((prev) => {
                  const next = new Set(prev);
                  next.delete(message.userId!);
                  return next;
                });
              }, 3000);
            }
            break;

          case "message":
            window.dispatchEvent(
              new CustomEvent("chat-message", { detail: message.message }),
            );
            break;

          case "error":
            console.error("WebSocket error:", message.error);
            break;
        }
        
        onMessage?.(message);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      onDisconnect?.();
      
      // Attempt to reconnect with exponential backoff
      if (enabled && reconnectAttemptsRef.current < 5) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
        reconnectAttemptsRef.current++;
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      }
    };
  }, [enabled, conversationId, userId, onMessage, onConnect, onDisconnect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  const sendTyping = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN && userId && conversationId) {
      wsRef.current.send(JSON.stringify({
        type: "typing",
        userId,
        conversationId,
      }));
    }
  }, [userId, conversationId]);

  const sendChatMessage = useCallback((message: Message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "message",
        conversationId,
        message,
      }));
    }
  }, [conversationId]);

  return {
    isConnected,
    connected: isConnected, // Alias for compatibility
    typingUsers,
    sendMessage,
    sendTyping,
    sendChatMessage,
  };
}

// Export original signature for backward compatibility
export function useWebSocketLegacy(
  conversationId: string,
  userId: string,
  enabled: boolean = true,
) {
  return useWebSocket({
    conversationId,
    userId,
    enabled,
  });
}
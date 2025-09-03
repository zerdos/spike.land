import { useEffect, useRef, useState } from "react";
import type { WebSocketMessage } from "../../src/types";

export function useWebSocket(
  conversationId: string,
  userId: string,
  enabled: boolean = true
) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (!enabled || !conversationId || !userId) return;
    
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/${conversationId}`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    
    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({
        type: "presence",
        userId,
        conversationId,
      }));
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
              new CustomEvent("chat-message", { detail: message.message })
            );
            break;
            
          case "error":
            console.error("WebSocket error:", message.error);
            break;
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };
    
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };
    
    ws.onclose = () => {
      setConnected(false);
    };
    
    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [conversationId, userId, enabled]);
  
  const sendTyping = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "typing",
        userId,
        conversationId,
      }));
    }
  };
  
  const sendMessage = (message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "message",
        conversationId,
        message,
      }));
    }
  };
  
  return {
    connected,
    typingUsers,
    sendTyping,
    sendMessage,
  };
}
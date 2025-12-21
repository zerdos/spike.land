import { useCallback, useEffect, useState } from "react";

interface ChatMessage {
  sender: string;
  text: string;
}

interface MessagePayload {
  type: string;
  to?: string;
  [key: string]: unknown;
}

export const useChat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleIncomingMessages = useCallback((event: MessageEvent) => {
    if (event.data?.type === "chat-message") {
      const { sender, text } = event.data;
      setChatHistory((prev) => [...prev, { sender, text }]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleIncomingMessages);

    return () => {
      window.removeEventListener("message", handleIncomingMessages);
    };
  }, [handleIncomingMessages]);

  const sendMessage = useCallback((payload: MessagePayload) => {
    if (payload?.to) {
      window.postMessage(payload, location.origin);
    }
  }, []);

  return {
    sendMessage,
    chatHistory,
  };
};

import { useEffect, useState } from "react";

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

  useEffect(() => {
    window.addEventListener("message", handleIncomingMessages);

    return () => {
      window.removeEventListener("message", handleIncomingMessages);
    };
  }, []);

  const handleIncomingMessages = (event: MessageEvent) => {
    if (event.data?.type === "chat-message") {
      const { sender, text } = event.data;
      setChatHistory((prev) => [...prev, { sender, text }]);
    }
  };

  const sendMessage = (payload: MessagePayload) => {
    if (payload?.to) {
      window.postMessage(payload, location.origin);
    }
  };

  return {
    sendMessage,
    chatHistory,
  };
};

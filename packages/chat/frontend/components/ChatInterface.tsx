import { useEffect, useRef, useState } from "react";
import type { Conversation, Message } from "../../src/types";

interface ChatInterfaceProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
  onRegenerateMessage: (messageId: string) => Promise<void>;
  isLoading?: boolean;
}

export function ChatInterface({
  conversation,
  messages,
  onSendMessage,
  onRegenerateMessage,
  isLoading = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const message = input;
    setInput("");
    setSending(true);

    try {
      await onSendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
      setInput(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>{conversation.title}</h2>
        <div className="chat-meta">
          Model: {conversation.model}
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message message-${message.role}`}
          >
            <div className="message-role">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
            <div className="message-content">{message.content}</div>
            {message.role === "assistant" && (
              <button
                onClick={() => onRegenerateMessage(message.id)}
                className="regenerate-btn"
                disabled={isLoading}
              >
                Regenerate
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message message-assistant">
            <div className="message-role">Assistant</div>
            <div className="message-content">
              <span className="typing-indicator">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={sending || isLoading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending || isLoading}
          className="send-btn"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

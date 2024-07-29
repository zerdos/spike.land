import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { ChatHeader, ChatContainer, MessageInput, ChatWindow } from "./chat/components";
import { Message } from "./chat/types";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const draggableWindow = document.getElementById("DraggableWindow");
    if (draggableWindow) {
      draggableWindow.style.transition = "left 0.3s ease-in-out";
      draggableWindow.style.left = isOpen ? "0" : "";
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(() => {
    if (input.trim() === "" || isStreaming) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsStreaming(true);

    // Implement your message sending logic here
  }, [input, isStreaming]);

  const handleEditMessage = useCallback(
    (id: string) => {
      const messageToEdit = messages.find((msg) => msg.id === id);
      if (messageToEdit && messageToEdit.role === "user") {
        setEditingMessageId(id);
        setEditInput(messageToEdit.content);
      }
    },
    [messages],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, []);

  const handleSaveEdit = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, content: editInput } : msg))
      );
      setEditingMessageId(null);
      setEditInput("");
    },
    [editInput],
  );

  const handleResetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    setIsStreaming(false);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    // Apply dark mode class to root element here if needed
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <ChatWindow isOpen={isOpen}>
        <ChatHeader
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          handleResetChat={handleResetChat}
          onClose={() => setIsOpen(false)}
        />
        <ChatContainer
          messages={messages}
          editingMessageId={editingMessageId}
          editInput={editInput}
          setEditInput={setEditInput}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
          handleEditMessage={handleEditMessage}
          isStreaming={isStreaming}
          messagesEndRef={messagesEndRef}
        />
        <MessageInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          inputRef={inputRef}
        />
      </ChatWindow>
    </>
  );
};

export default ChatInterface;

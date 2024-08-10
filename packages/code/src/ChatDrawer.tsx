import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChatContainer, ChatHeader, ChatWindow, MessageInput } from "./chat/components";
import { Message } from "./chat/types/Message";
export type { Message };

interface ChatFCProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  messages: Message[];
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (input: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
  handleEditMessage: (messageId: string) => void;
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (content: string, screenshot?: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export const ChatFC: React.FC<ChatFCProps> = memo(({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  handleResetChat,
  messages,
  editingMessageId,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
  handleEditMessage,
  isStreaming,
  messagesEndRef,
  input,
  setInput,
  handleSendMessage,
  inputRef,
}) => (
  <ChatWindow isOpen={isOpen}>
    <ChatHeader
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      onClose={onClose}
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
));

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

  const handleSendMessage = useCallback((_inp: string, screenshot?: string) => {
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
        prev.map((
          msg,
        ) => (msg.id === id ? { ...msg, content: editInput } : msg))
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

// Memoize sub-components
const MemoizedChatHeader = memo(ChatHeader);
const MemoizedChatContainer = memo(ChatContainer);
const MemoizedMessageInput = memo(MessageInput);

const ChatButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button
    onClick={onClick}
    className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
  >
    <Bot className="h-6 w-6" />
  </Button>
));

export default ChatInterface;

export {
  ChatButton,
  MemoizedChatContainer as ChatContainer,
  MemoizedChatHeader as ChatHeader,
  MemoizedMessageInput as MessageInput,
};

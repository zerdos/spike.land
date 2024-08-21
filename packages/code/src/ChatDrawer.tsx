import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChatContainer, ChatHeader, ChatWindow, MessageInput } from "./chat/components";
import { Message } from "./types/Message";
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
  handleSendMessage: (content: string, screenshot: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  isMobile: boolean;
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
  isScreenshotLoading,
  screenshotImage,
  handleScreenshotClick,
  handleCancelScreenshot,
  isMobile,
}) => (
  <ChatWindow isOpen={isOpen} isMobile={isMobile}>
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
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
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
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
  const [screenshotImage, setScreenshotImage] = useState<string | null>(null);
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
    setScreenshotImage(null);

    // Implement your message sending logic here
  }, [input, isStreaming, screenshotImage]);

  const handleEditMessage = useCallback(
    (id: string) => {
      const messageToEdit = messages.find((msg) => msg.id === id);
      if (messageToEdit && messageToEdit.role === "user") {
        setEditingMessageId(id);
        setEditInput(JSON.stringify(messageToEdit.content));
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
    setScreenshotImage(null);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    // Apply dark mode class to root element here if needed
  }, []);

  const handleScreenshotClick = useCallback(() => {
    setIsScreenshotLoading(true);
    // Simulating screenshot capture (replace with actual implementation)
    setTimeout(() => {
      const mockScreenshotUrl = "https://example.com/mock-screenshot.jpg";
      setScreenshotImage(mockScreenshotUrl);
      setIsScreenshotLoading(false);
    }, 4000);
  }, []);

  const handleCancelScreenshot = useCallback(() => {
    setScreenshotImage(null);
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <ChatFC
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleResetChat={handleResetChat}
        messages={messages}
        editingMessageId={editingMessageId}
        editInput={editInput}
        setEditInput={setEditInput}
        handleCancelEdit={handleCancelEdit}
        handleSaveEdit={handleSaveEdit}
        handleEditMessage={handleEditMessage}
        isStreaming={isStreaming}
        messagesEndRef={messagesEndRef}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        inputRef={inputRef}
        isScreenshotLoading={isScreenshotLoading}
        screenshotImage={screenshotImage}
        handleScreenshotClick={handleScreenshotClick}
        handleCancelScreenshot={handleCancelScreenshot}
        isMobile={false}
      />
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

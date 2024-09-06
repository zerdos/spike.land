import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { MessageInput } from "./chat/components";
import { Message, MessageContent } from "./types/Message";
import { ImageData } from "@/lib/interfaces";
export type { Message };

interface ChatFCProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  messages: Message[];
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (content: string, images: ImageData[]) => Promise<void>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
}

const renderMessageContent = (content: MessageContent) => {
  if (Array.isArray(content)) {
    return content.map((item, index) => {
      if (item.type === "text") {
        return <p key={index}>{item.text}</p>;
      } else if (item.type === "image" && item.source?.type === "base64") {
        return (
          <img
            key={index}
            src={`data:${item.source.media_type};base64,${item.source.data}`}
            alt="Image in message"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
      return null;
    });
  } else {
    return <p>{content}</p>;
  }
};

export const ChatFC: React.FC<ChatFCProps> = memo(({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  handleResetChat,
  messages,
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
}) => (
  <div className={`chat-window ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : ''}`}>
    <div className="chat-header">
      <span>AI spike pilot</span>
      <div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? "Light" : "Dark"}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleResetChat}>
          Reset
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
    <div className="chat-messages">
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.role}`}>
          {renderMessageContent(message.content)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
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
      isDarkMode={isDarkMode}
    />
  </div>
));

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSendMessage = useCallback(async (content: string, images: ImageData[]) => {
    if (content.trim() === "" || isStreaming) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: [{ type: "text", text: content }],
      role: "user",
    };

    if (images.length > 0) {
      newMessage.content = [
        ...images.map(img => ({
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: img.type as "image/jpeg" | "image/png",
            data: img.data.split(",")[1],
          },
        })),
        ...newMessage.content,
      ] as MessageContent;
    }

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsStreaming(true);
    setScreenshotImage(null);

    // Implement your message sending logic here
    // You may need to update this part to handle the actual API call
  }, [isStreaming]);

  const handleResetChat = useCallback(() => {
    setMessages([]);
    setInput("");
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
      />
    </>
  );
};

export default ChatInterface;

export const ChatButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button
    onClick={onClick}
    className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
  >
    <Bot className="h-6 w-6" />
  </Button>
));

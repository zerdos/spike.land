
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/components/app/chat-message";
import { Camera, Moon, RefreshCw, Send, Sun, X } from "@/external/lucideReact";
import { css } from "@emotion/react";


import {  TypingIndicator } from "@src/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./styles";

import type { ChatContainerProps, ChatHeaderProps, ChatWindowProps, MessageInputProps } from "@/lib/interfaces";


export const ChatHeader: React.FC<ChatHeaderProps> = (
  { isDarkMode, toggleDarkMode, handleResetChat, onClose },
) => (
  <div
    className={`p-4 font-bold flex justify-between items-center ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
    }`}
  >
    <span>AI spike pilot</span>
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
        {isDarkMode
          ? <Sun className="h-4 w-4" />
          : <Moon className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={handleResetChat}>
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export const ChatContainer: React.FC<ChatContainerProps> = React.memo(({
  messages,
  editingMessageId,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
  handleEditMessage,
  isStreaming,
  isDarkMode,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [typingIndicatorMustShow, setTypingIndicatorIsOn] = useState(isStreaming);

  const scrollToBottom = () =>
    lastMessageRef.current! && lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [
    messages,
    isStreaming,
    scrollToBottom,
    scrollAreaRef,
    scrollAreaRef.current?.scrollHeight,
    lastMessageRef.current,
  ]);

  // This effect ensures scrolling when the component mounts and after each render
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isStreaming) {
      setTypingIndicatorIsOn(true);
    } else {
      timeoutId = setTimeout(() => {
        setTypingIndicatorIsOn(false);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [isStreaming]);

  return (
    <ScrollArea
      className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      ref={scrollAreaRef}
    >
      <div className="p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index + "--" + message.id}
            message={message}
            isSelected={editingMessageId === message.id}
            onDoubleClick={() => handleEditMessage(message.id)}
            isEditing={editingMessageId === message.id}
            editInput={editInput}
            setEditInput={setEditInput}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
            isDarkMode={isDarkMode}
          />
        ))}
        {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
      </div>
    </ScrollArea>
  );
});

export const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  isStreaming,
  inputRef,
  isScreenshotLoading,
  screenshotImage,
  handleScreenshotClick,
  handleCancelScreenshot,
  isDarkMode,
}) => {
  const handleSend = () => {
    handleSendMessage(input, screenshotImage || "");
    setInput(""); // Clear input after sending
    handleCancelScreenshot(); // Clear screenshot after sending
  };

  if (isStreaming) {
    return null; // Hide input when AI is typing
  }

  return (
    <div className={`p-2 mt-auto ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="flex flex-col space-y-2">
        {screenshotImage && (
          <div className="relative">
            <img src={screenshotImage} alt="Screenshot Preview" className="max-w-full h-auto rounded-lg" />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCancelScreenshot}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex items-end space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className={`flex-1 min-h-[40px] max-h-[120px] resize-none ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
            ref={inputRef}
          />
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleScreenshotClick}
              variant={screenshotImage ? "secondary" : "outline"}
              size="icon"
              title={screenshotImage ? "Remove screenshot" : "Attach screenshot"}
              disabled={isScreenshotLoading}
              className={`transition-all duration-300 ${
                isScreenshotLoading ? "animate-pulse" : ""
              } bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600`}
            >
              {isScreenshotLoading
                ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                : <Camera className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleSend}
              disabled={input.trim() === "" && !screenshotImage}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  children,
  isOpen,
  isMobile,
  isDarkMode,
}) => (
  <div
    css={[
      styles.chatWindow,
      css`
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: ${isMobile ? "100%" : "min(100%, 480px)"};
        min-width: ${isMobile ? "100%" : "480px"};
        z-index: 1000;
        transition: transform 0.3s ease-in-out;
        background-color: ${isDarkMode ? "#1a202c" : "#ffffff"};
        color: ${isDarkMode ? "#ffffff" : "#000000"};
      `,
    ]}
    style={{
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    }}
  >
    <div
      css={[
        styles.chatContent,
        css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `,
      ]}
    >
      {children}
    </div>
  </div>
);

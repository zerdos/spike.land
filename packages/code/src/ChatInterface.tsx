import { useDarkMode } from "@/hooks/use-dark-mode";
import React, {  useCallback, useEffect, useMemo } from "react";
import { ChatDrawer } from "./ChatDrawer";
import { ICode } from "./cSess.interface";
import { useChat } from "./hooks/useChat";
import { useCodeSpace } from "./hooks/useCodeSpace";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import { ImageData, Message } from "@/lib/interfaces";


export const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
  isMobile: boolean;
}> = React.memo(({ onClose, isOpen, isMobile, cSess }) => {
  const codeSpace = useCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const {
    messages = [],
    setMessages,
    input,
    setInput,
    isStreaming,
    setIsStreaming,
    codeWhatAiSeen,
    resetChat,
    setAICode,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    messagesEndRef,
    inputRef,
  } = useChat(codeSpace);

  const {
    handleSendMessage,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  } = useMessageHandling({
    codeSpace,
    messages,
    setMessages: setMessages as React.Dispatch<React.SetStateAction<Message[]>>,
    setInput,
    setIsStreaming: setIsStreaming as React.Dispatch<React.SetStateAction<boolean>>,
    codeWhatAiSeen,
    setAICode,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    cSess,
  });

  const handleResetChat = useCallback(() => {
    resetChat();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

  const {
    isScreenshotLoading,
    screenshotImage,
    handleScreenshotClick,
    handleCancelScreenshot,
  } = useScreenshot(codeSpace);

  const memoizedChatFCProps = useMemo(() => ({
    isOpen,
    onClose,
    handleEditMessage,
    handleResetChat,
    handleSaveEdit,
    handleSendMessage,
    isStreaming,
    messages,
    messagesEndRef,
    isDarkMode,
    toggleDarkMode,
    editingMessageId,
    editInput,
    setEditInput,
    input,
    setInput,
    inputRef,
    handleCancelEdit,
    isScreenshotLoading,
    screenshotImage,
    handleScreenshotClick,
    handleCancelScreenshot,
    isMobile,
  }), [
    isOpen,
    onClose,
    handleEditMessage,
    handleResetChat,
    handleSaveEdit,
    handleSendMessage,
    isStreaming,
    messages,
    isDarkMode,
    toggleDarkMode,
    editingMessageId,
    editInput,
    input,
    handleCancelEdit,
    isScreenshotLoading,
    screenshotImage,
    isMobile,
  ]);

  useEffect(() => {


    if (codeSpace.includes("-")) {
      const maybeKey = codeSpace.split("-")[1];
      if (sessionStorage.getItem(maybeKey)) {

        const {prompt, images} = JSON.parse(sessionStorage.getItem(maybeKey)!) as {prompt: string; images: ImageData[]};
        sessionStorage.removeItem(maybeKey);

        memoizedChatFCProps.handleSendMessage(prompt, images)
      }

    }


    if (isOpen) {
      setTimeout(() => {
        document.getElementById("typing-indicator")?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }, [isOpen, messages, messagesEndRef]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScreenshotLoading) {
      interval = setInterval(() => {
        document.getElementById("typing-indicator")?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  if (!isOpen) return null;
  return (
    <ChatDrawer
      isOpen={isOpen}
      onClose={onClose}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      messages={messages}
      isStreaming={!!isStreaming}
      messagesEndRef={messagesEndRef}
      input={input}
      setInput={setInput}
      handleSendMessage={handleSendMessage}
      inputRef={inputRef}
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
      isMobile={isMobile}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={setEditInput}
      handleEditMessage={handleEditMessage}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
    />
  );
});
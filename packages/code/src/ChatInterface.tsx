import { useDarkMode } from "@/hooks/use-dark-mode";
import React, {  useCallback, useEffect, useMemo } from "react";
import { ChatDrawer } from "@/components/app/chat-drawer";
import type { ICode } from "@/lib/interfaces";
import { useChat } from "./hooks/useChat";
import { useCodeSpace } from "@/hooks/use-code-space";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import type { ImageData, Message } from "@/lib/interfaces";


export const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }) => {
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
    setIsStreaming(false);
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
    handleCancelScreenshot
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
    screenshotImage
  ]);

  useEffect(() => {
    if (isOpen) {

      setTimeout(() => {
        document.getElementById("after-last-message")?.scrollIntoView({ behavior: "instant", block: "end" });
      });
    }
    if (codeSpace.includes("-")) {
      const maybeKey = codeSpace.split("-")[1];
      if (sessionStorage.getItem(maybeKey)) {
        const {prompt, images} = JSON.parse(sessionStorage.getItem(maybeKey)!) as {prompt: string; images: ImageData[]};
        sessionStorage.removeItem(maybeKey);
        memoizedChatFCProps.handleSendMessage(prompt, images)
      }
    }
  }, [isOpen, messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
      input={input}
      setInput={setInput}
      handleSendMessage={handleSendMessage}
      inputRef={inputRef}
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={setEditInput}
      handleEditMessage={handleEditMessage}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
      codeSpace={codeSpace}
      screenShot={()=>cSess.screenShot()}
    />
  );
});
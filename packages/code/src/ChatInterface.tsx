import React, { useMemo } from "react";
import { ChatFC } from "./ChatDrawer";
import { useChat } from "./hooks/useChat";
import { useCodeSpace } from "./hooks/useCodeSpace";
import { useDarkMode } from "./hooks/useDarkMode";
import { useMediaQuery } from "./hooks/useMediaQuery"; // Add this import
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import { loadMessages } from "./utils/chatUtils";

const ChatInterface: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}> = React.memo(({ onClose, isOpen, isMobile }) => {
  const codeSpace = useCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const {
    messages,
    setMessages,
    input,
    setInput,
    isStreaming,
    setIsStreaming,
    codeWhatAiSeen,
    setAICode,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    messagesEndRef,
    inputRef,
    broadcastChannel,
    saveMessages,
  } = useChat(codeSpace, loadMessages);

  const {
    handleSendMessage,
    handleResetChat,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  } = useMessageHandling({
    codeSpace,
    messages,
    setMessages,
    setInput,
    setIsStreaming,
    codeWhatAiSeen,
    setAICode,
    saveMessages,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    broadcastChannel,
  });

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

  return <ChatFC {...memoizedChatFCProps} />;
});

export default ChatInterface;

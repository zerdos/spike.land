import React, { useMemo, useState } from "react";
import { ChatFC } from "./ChatDrawer";
import { useChat } from "./hooks/useChat";
import { useCodeSpace } from "./hooks/useCodeSpace";
import { useDarkMode } from "./hooks/useDarkMode";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { loadMessages } from "./utils/chatUtils";

const codeSpace = useCodeSpace();

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = React.memo(
  ({ onClose, isOpen }) => {
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

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // New state for managing screenshot loading and image
    const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
    const [screenshotImage, setScreenshotImage] = useState<string | null>(null);

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

    const screenshotToBase64Maker = (codeSpace: string) =>
      fetch(
        `/live/${codeSpace}/screenshot`,
      )
        .then((response) => response.blob())
        .then((blob) =>
          new Promise((resolve) => {
            var reader = new FileReader();
            reader.onload = function() {
              const base64 = this.result as string;
              resolve(base64);
            }; // <--- `this.result` contains a base64 data URI
            reader.readAsDataURL(blob);
          }).then((base64) => base64 as string)
        );
    // New function to handle screenshot button click
    const handleScreenshotClick = () => {
      setIsScreenshotLoading(true);
      // Simulating screenshot capture (replace with actual implementation)
      setTimeout(async () => {
        setScreenshotImage(await screenshotToBase64Maker(codeSpace));
        setIsScreenshotLoading(false);
      });
    };

    // New function to handle screenshot cancellation
    const handleCancelScreenshot = () => {
      setScreenshotImage(null);
    };

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
      // New props
      isScreenshotLoading,
      screenshotImage,
      handleScreenshotClick,
      handleCancelScreenshot,
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
      // New dependencies
      isScreenshotLoading,
      screenshotImage,
    ]);

    return <ChatFC {...memoizedChatFCProps} />;
  },
);

export default ChatInterface;

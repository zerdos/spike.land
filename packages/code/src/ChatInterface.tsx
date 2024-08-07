import React, { useMemo } from "react";
import { ChatFC } from "./ChatDrawer";
import { getCodeSpace, loadMessages } from "./utils/chatUtils";
import { useChat } from "./hooks/useChat";
import { useDarkMode } from "./hooks/useDarkMode";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { AIHandler } from "./AIHandler";



const codeSpace = getCodeSpace();
const aiHandler = new AIHandler(codeSpace);

interface ChatInterfaceProps {
  onCodeUpdate: (code: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = React.memo(
  ({ onCodeUpdate, onClose, isOpen }) => {
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
      onCodeUpdate,
      aiHandler,
      editingMessageId,
      setEditingMessageId,
      editInput,
      setEditInput,
      broadcastChannel,
    });

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
    ]);

    return <ChatFC {...memoizedChatFCProps} />;
  },
);

export default ChatInterface;

import React, { useEffect, useRef, useState } from "react";
import { ChatFC, Message } from "./ChatDrawer";
import { antropic, gptSystem, reminder } from "./initialMessage";
import { prettier } from "./shared";
import { extractArtifacts } from "./utils/extractArtifacts";
import { useChat } from "./hooks/useChat";
import { useDarkMode } from "./hooks/useDarkMode";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useAIProcessing } from "./hooks/useAIProcessing";

// Utility Functions
const getCodeSpace = (): string => {
  return location.pathname.slice(1).split("/")[1];
};

const codeSpace = getCodeSpace();

// Main Component: ChatInterface
const ChatInterface: React.FC<
  { onCodeUpdate: (code: string) => void; isOpen: boolean; onClose: () => void }
> = (
  { onCodeUpdate, onClose, isOpen },
): React.ReactElement => {
  const {
    messages,
    setMessages,
    input,
    setInput,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    handleResetChat,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  } = useChat(codeSpace);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const {
    isStreaming,
    setIsStreaming,
    codeFound,
    setCodeFound,
    codeWhatAiSeen,
    setAICode,
    handleSendMessage,
  } = useMessageHandling(messages, setMessages, onCodeUpdate, codeSpace);

  const { sendToAnthropic, continueWithOpenAI } = useAIProcessing(
    setMessages,
    setIsStreaming,
    onCodeUpdate,
    setAICode
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatFC
      isOpen={isOpen}
      onClose={onClose}
      handleEditMessage={handleEditMessage}
      handleResetChat={handleResetChat}
      handleSaveEdit={handleSaveEdit}
      handleSendMessage={handleSendMessage}
      isStreaming={isStreaming}
      messages={messages}
      messagesEndRef={messagesEndRef}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={setEditInput}
      input={input}
      setInput={setInput}
      inputRef={inputRef}
      handleCancelEdit={handleCancelEdit}
    /> as React.ReactElement
  );
};

export default ChatInterface;


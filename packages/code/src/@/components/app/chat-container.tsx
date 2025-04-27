import { ChatMessage } from "@/components/app/chat-message";
import type { ChatContainerProps, Message } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

const AnimatedDot: React.FC<{ delay: number; isDarkMode: boolean; }> = React
  .memo(({ delay, isDarkMode }) => (
    <motion.div
      className={cn(
        "w-2 h-2 rounded-full",
        isDarkMode ? "bg-gray-400" : "bg-gray-800",
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay,
      }}
    />
  ));

const TypingDots: React.FC<TypingIndicatorProps> = React.memo((
  { isDarkMode },
) => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((dot) => <AnimatedDot key={dot} delay={dot * 0.2} isDarkMode={isDarkMode} />)}
  </div>
));

const TypingIndicator: React.FC<TypingIndicatorProps> = React.memo((
  { isDarkMode },
) => (
  <div className="flex space-x-2 items-center p-2">
    <span className="text-sm text-gray-500">AI is typing</span>
    <TypingDots isDarkMode={isDarkMode} />
  </div>
));

export const ChatContainer: React.FC<ChatContainerProps> = React.memo(
  ({
    messages,
    setEditingMessageId,
    editingMessageId,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    onNewPrompt,
    handleEditMessage: _handleEditMessage,
    isStreaming,
    isDarkMode,
  }) => {
    const [typingIndicatorMustShow, setTypingIndicatorMustShow] = useState(isStreaming);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout | undefined;
      if (isStreaming) {
        setTypingIndicatorMustShow(true);
      } else {
        timeoutId = setTimeout(() => setTypingIndicatorMustShow(false), 1000);
      }
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [isStreaming]);

    const renderMessage = useCallback(
      (message: Message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isSelected={editingMessageId === message.id}
          onDoubleClick={() => setEditingMessageId(message.id)}
          isEditing={editingMessageId === message.id}
          editInput={editInput}
          setEditInput={setEditInput}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
          isDarkMode={isDarkMode}
          onNewPrompt={onNewPrompt}
        />
      ),
      [editingMessageId, editInput, isDarkMode, setEditingMessageId, setEditInput, handleCancelEdit, handleSaveEdit, onNewPrompt]
    );

    const memoizedMessages = useMemo(() => messages.map(renderMessage), [
      messages,
      renderMessage,
    ]);

    return (
      <section
        className="p-4 space-y-4"
        data-testid="chat-messages-container"
        role="log"
        aria-live={isStreaming ? "polite" : undefined}
        aria-busy={isStreaming}
      >
        {memoizedMessages}
        {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
      </section>
    );
  }
);

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;

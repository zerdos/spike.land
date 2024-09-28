import React, { useEffect, useState, useCallback } from "react";
import { ChatContainerProps } from "@/lib/interfaces";

import { ChatMessage } from "@/components/app/chat-message";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { md5 } from "@/lib/md5";



// Components
interface TypingIndicatorProps {
    isDarkMode: boolean;
  }
  
  const AnimatedDot: React.FC<{ delay: number; isDarkMode: boolean }> = ({ delay, isDarkMode }) => (
    <motion.div
      className={cn(
        "w-2 h-2 rounded-full",
        isDarkMode ? "bg-gray-400" : "bg-gray-800"
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
  );
  
  const TypingDots: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => <AnimatedDot key={dot} delay={dot * 0.2} isDarkMode={isDarkMode} />)}
    </div>
  );
  
  export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => <div className="flex space-x-2 items-center p-2">
        <span className="text-sm text-gray-500">AI is typing</span>
        <TypingDots isDarkMode={isDarkMode} />
      </div>
    

export const ChatContainer: React.FC<
  ChatContainerProps & { codeSpace: string }
> = React.memo((props) => {
  const {
    messages,
    editingMessageId,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    handleEditMessage,
    isStreaming,
    isDarkMode,
    codeSpace,
  } = props;

  const [typingIndicatorMustShow, setTypingIndicatorMustShow] = useState(
    isStreaming
  );


  const memoizedHandleEditMessage = useCallback(
    (id: string) => handleEditMessage(id),
    [handleEditMessage]
  );

  const memoizedSetEditInput = useCallback(
    (value: string) => setEditInput(value),
    [setEditInput]
  );

  const memoizedHandleCancelEdit = useCallback(
    () => handleCancelEdit(),
    [handleCancelEdit]
  );

  const memoizedHandleSaveEdit = useCallback(
    (id: string) => handleSaveEdit(id),
    [handleSaveEdit]
  );

  useEffect(() => {
    if (isStreaming) {
      setTypingIndicatorMustShow(true);
      return () => {};
    } else {
      const timeoutId = setTimeout(() => {
        setTypingIndicatorMustShow(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isStreaming]);

  const renderMessage = useCallback(
    (message: any, hashedKey: string) => (
      <ChatMessage
        key={hashedKey}
        message={message}
        isSelected={editingMessageId === message.id}
        onDoubleClick={() => memoizedHandleEditMessage(message.id)}
        isEditing={editingMessageId === message.id}
        editInput={editInput}
        setEditInput={memoizedSetEditInput}
        handleCancelEdit={memoizedHandleCancelEdit}
        handleSaveEdit={memoizedHandleSaveEdit}
        isDarkMode={isDarkMode}
        codeSpace={codeSpace}
      />
    ),
    [
      editingMessageId,
      editInput,
      memoizedHandleEditMessage,
      memoizedSetEditInput,
      memoizedHandleCancelEdit,
      memoizedHandleSaveEdit,
      isDarkMode,
      codeSpace,
    ]
  );

  return (
    <div className="p-4 space-y-4">
      {messages.map((v, i)=>{

        const hash = isStreaming && (i===messages.length-1)? 'streaming': md5(JSON.stringify(v));

        return renderMessage(v, `${i}-${hash}`);
      })}
      {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
    </div>
  );
});

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;
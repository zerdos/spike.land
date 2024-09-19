import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ChatContainerProps } from "@/lib/interfaces";
import { TypingIndicator } from "@src/utils/utils";
import { ChatMessage } from "@/components/app/chat-message";


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

  const memoizedMessages = useMemo(() => messages, [messages]);

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
    (message: any, index: number) => (
      <ChatMessage
        key={index}
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
      {memoizedMessages.map(renderMessage)}
      {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
    </div>
  );
});

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;
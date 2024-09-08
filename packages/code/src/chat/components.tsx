import { Button } from "@/components/ui/button";
import {   RefreshCw, X } from "@/external/lucideReact";
import { ChatContainerProps, ChatHeaderProps } from "@/lib/interfaces";
import { TypingIndicator } from "@src/utils/utils";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ChatMessage } from "@/components/app/chat-message";  

export const ChatHeader: React.FC<ChatHeaderProps> = (
  { isDarkMode, handleResetChat, onClose },
) => (
  <div
    className={`p-4 font-bold flex justify-between items-center ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
    }`}
  >
    <span>AI spike pilot</span>
    <div className="flex items-center space-x-2">
      <ThemeToggle /> 
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
  onImageUpload, // Update this prop type
}) => {

  const [typingIndicatorMustShow, setTypingIndicatorIsOn] = useState(isStreaming);

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
            onImageUpload={(images: File[]) => onImageUpload(images[0] as import("@/lib/interfaces").ImageData)}
          />
        ))}
        {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
  
      </div>
  );
});


import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {  Check, RefreshCw, X } from "@/external/lucideReact";
import { Message, ChatContainerProps, ChatHeaderProps } from "@/lib/interfaces";
import { TypingIndicator } from "@src/utils/utils";
import React, { useEffect, useState } from "react";
import { renderMessage } from "@/lib/render-messages";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const ChatMessage: React.FC<{
  message: Message;
  isSelected: boolean;
  onDoubleClick: () => void;
  isEditing: boolean;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
  isDarkMode: boolean;
}> = React.memo(({
  message,
  isSelected,
  onDoubleClick,
  isEditing,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
  isDarkMode,
}) => {
  const isUser = message.role === "user";

  const renderContent = () => {
    if (typeof message.content === "string") {
      return renderMessage(message.content, isUser);
    } else if (Array.isArray(message.content)) {
      return message.content.map((item, index) => {
        if (item.type === "text") {
          return renderMessage(item.text!, isUser);
        } else if (item.type === "image" && item.source?.type === "base64") {
          const imageUrlFromBase64String = `data:${item.source.media_type};base64,${item.source.data}`;

          return (
            <img
              key={index}
              src={imageUrlFromBase64String}
              alt="Screenshot"
              className="max-w-full h-auto mt-2 rounded-lg"
            />
          );
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      onDoubleClick={onDoubleClick}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? isDarkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white"
            : isDarkMode
            ? isSelected
              ? "bg-gray-700 ring-2 ring-blue-500"
              : "bg-gray-800 text-white"
            : isSelected
            ? "bg-gray-200 ring-2 ring-blue-500"
            : "bg-gray-100"
        }`}
      >
        {isEditing
          ? (
            <div className="flex flex-col space-y-2">
              <Textarea
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                className={isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}
              />
              <div className="flex justify-end space-x-2">
                <Button size="sm" onClick={() => handleSaveEdit(message.id)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
          : (
            <div className="break-words">
              {renderContent()}
            </div>
          )}
      </div>
    </div>
  );
});

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
          />
        ))}
        {typingIndicatorMustShow && <TypingIndicator isDarkMode={isDarkMode} />}
  
      </div>
  );
});

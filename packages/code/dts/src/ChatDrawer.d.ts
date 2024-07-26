import React from "react";
import type { FC, ReactNode } from "react";
import type { Message } from "./ChatInterface";
export declare const ChatMessage: (
  {
    message,
    isUser,
    onDoubleClick,
    isSelected,
    onEdit,
    isEditing,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
  }: {
    message: string;
    isUser: boolean;
    onDoubleClick: () => void;
    isSelected: boolean;
    onEdit: (newText: string) => void;
    isEditing: boolean;
    editInput: string;
    setEditInput: (value: string) => void;
    handleCancelEdit: () => void;
    handleSaveEdit: (id: string) => void;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const ChatHeader: (
  { isDarkMode, toggleDarkMode, handleResetChat, onClose }: {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    handleResetChat: () => void;
    onClose: () => void;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const ChatContainer: (
  {
    messages,
    editingMessageId,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    handleEditMessage,
    isStreaming,
    messagesEndRef,
  }: {
    messages: Message[];
    editingMessageId: string | null;
    editInput: string;
    setEditInput: (value: string) => void;
    handleCancelEdit: () => void;
    handleSaveEdit: (messageId: string) => void;
    handleEditMessage: (id: string) => void;
    isStreaming: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const MessageInput: (
  { input, setInput, handleSendMessage, isStreaming, inputRef }: {
    input: string;
    setInput: (value: string) => void;
    handleSendMessage: (content: string) => void;
    isStreaming: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const ChatWindow: FC<{
  isOpen: boolean;
  children: ReactNode;
}>;
declare const ChatInterface: () =>
  import("@emotion/react/jsx-runtime").JSX.Element;
export default ChatInterface;

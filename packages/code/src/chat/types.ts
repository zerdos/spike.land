import { ReactNode } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  onClose: () => void;
}

export interface ChatContainerProps {
  messages: Message[];
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
  handleEditMessage: (id: string) => void;
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (value: string) => void;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export interface ChatWindowProps {
  isOpen: boolean;
  children: ReactNode;
}

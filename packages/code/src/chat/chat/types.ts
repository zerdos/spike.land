import { ReactNode } from "react";

import { Message } from "../types/Message";
export type { Message };

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
  isDarkMode: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface MessageInputProps {
  input: string;
  isDarkMode: boolean;
  setInput: (value: string) => void;
  handleSendMessage: (value: string, screenshot: string) => void;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
}

export interface ChatWindowProps {
  isOpen: boolean;
  children: ReactNode;
  isDarkMode: boolean;
  isMobile: boolean;
}

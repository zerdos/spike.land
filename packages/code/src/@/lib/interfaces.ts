import type { EmotionCache } from "@emotion/cache";
import { ReactNode } from "react";
import type { Root } from "react-dom/client";

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
  isMobile: boolean;
  isDarkMode: boolean;
}

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
  transpiled: string;
};

export interface ICode {
  session: ICodeSession;
  codeSpace: string;

  broadCastSessChanged(): void;
  setCode(rawCode: string): Promise<string | boolean>;
  sub: (fn: (sess: ICodeSession) => void) => void;
}

export interface IRenderApp {
  rootElement?: HTMLDivElement;
  App?: React.ComponentType<any>;
  codeSpace?: string;
  transpiled?: string;
  code?: string;
}

export interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: React.ComponentType<any>;
  cssCache: EmotionCache;
  cleanup: () => void;
}

export interface ImageData {
  imageName: string;
  url: string;
  src: string;
  mediaType: string;
  data: string;
  type: string;
}

export interface LanguageMap {
  [key: string]: string;
}

export interface MessagePart {
  type: "text" | "code";
  content: string;
  language?: string;
  isStreaming?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "system" | "assistant";
  content: MessageContent;
}

export type MessageContent =
  | string
  | Array<{
    type: "text" | "image";
    text?: string;
    source?: {
      type: "base64";
      media_type: "image/jpeg" | "image/png";
      data: string;
    };
  }>;

export interface IHistoryItem {
  timestamp: number;
  code: string;
}

export interface HistoryItemProps {
  item: IHistoryItem;
  index: number;
  totalItems: number;
  onRestore: (item: IHistoryItem) => void;
  onDelete: (timestamp: number) => void;
  cSess: ICode;
}

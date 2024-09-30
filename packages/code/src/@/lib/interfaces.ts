import type { EmotionCache } from "@emotion/cache";
import type { ReactNode } from "react";
import type { Root } from "react-dom/client";

export interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  onClose: () => void;
}

export interface MessageInputProps {
  input: string;
  isDarkMode: boolean;
  setInput: (value: string) => void;
  handleSendMessage: (content: string, images: ImageData[]) => Promise<void>;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  screenShot: () => Promise<ImageData>;
}

export interface ChatWindowProps {
  isOpen: boolean;
  children: ReactNode;
  isMobile: boolean;
  isDarkMode: boolean;
}

export interface ICodeSession {
  code: string;
  codeSpace: string;
  i: number;
  html: string;
  css: string;
  transpiled: string;
}

export interface ICode {
  session: ICodeSession;
  init: () => Promise<ICodeSession>;
  screenShot: () => Promise<ImageData>;
  currentCodeWithExtraModels: () => Promise<string>;
  setModelsByCurrentCode: (code: string) => Promise<string>;
  setCode(rawCode: string): Promise<string | boolean>;
  sub: (fn: (sess: ICodeSession) => void) => void;
}

export interface IRenderApp {
  rootElement?: HTMLDivElement;
  App?: React.ComponentType<Record<string, unknown>>;
  codeSpace?: string;
  transpiled?: string;
  code?: string;
}

export interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: React.ComponentType<unknown>;
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

// Basic types
type Role = "user" | "system" | "assistant";

// Image-specific types
interface ImageUrl {
  url: string;
}

// Content part interfaces
type TextPart = {
  type: "text";
  text: string;
};

interface ImageUrlPart {
  type: "image_url";
  image_url: ImageUrl;
}

interface ImagePart {
  type: "image";
  source: {
    type: string;
    media_type: string;
    data: string;
  };
}

export type MessagePart = TextPart | ImageUrlPart | ImagePart;
export type MessageContent = string | MessagePart[];

// Main message interface
export interface Message {
  id: string;
  role: Role;
  content: MessageContent;
}

// Utility type for cases where you might have a simple string content
export type SimpleMessage = Omit<Message, "content"> & { content: string };

// Union type to allow both complex and simple message formats
export type AnyMessage = Message | SimpleMessage;

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

export interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  messages: Message[];
  isStreaming: boolean;
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (content: string, images: ImageData[]) => Promise<void>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (input: string) => void;
  handleEditMessage: (messageId: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
  screenShot: () => Promise<ImageData>;
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
  isDarkMode: boolean;
}

export interface ChatWindowProps {
  isOpen: boolean;
  children: ReactNode;
  isDarkMode: boolean;
  isMobile: boolean;
}

export interface ImageData {
  imageName: string;
  url: string;
  src: string;
  mediaType: string;
  data: string;
}

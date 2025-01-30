import type { EmotionCache } from "@emotion/cache";
import type { ComponentType, ReactNode } from "react";
import type { Root } from "react-dom/client";

interface BaseProps {
  width?: number;
  height?: number;
}

export interface UseMessageHandlingProps {
  codeSpace: string;
}

export interface ParsingState {
  isInCodeBlock: boolean;
  currentLanguage?: string;
  accumulatedContent: string;
  isInDiffBlock: boolean;
  accumulatedDiffContent: string;
}

export type FlexibleComponentType<P = unknown> = ComponentType<P & BaseProps>;

export interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  onClose: () => void;
}

export interface HandleSendMessageProps {
  messages: Message[];
  codeSpace: string;
  prompt: string;
  images: ImageData[];
  code: string;
}

export interface MessageInputProps {
  input: string;
  isDarkMode: boolean;
  messages: Message[];
  setInput: (value: string) => void;
  handleSendMessage: (props: HandleSendMessageProps) => Promise<void>;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  isScreenshotLoading: boolean;
  code: string;
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
  html: string;
  css: string;
  messages: Message[];
  transpiled: string;
}

export interface ICode {
  session: ICodeSession;
  init: () => Promise<ICodeSession>;
  screenShot: () => Promise<ImageData>;
  addMessageChunk: (chunk: string) => void;
  setMessages: (messages: Message[]) => boolean;
  // currentCodeWithExtraModels: () => Promise<string>;
  // setModelsByCurrentCode: (code: string) => Promise<string>;
  setCode(
    rawCode: string,
    skipRunning?: boolean,
    transpiled?: string,
  ): Promise<string | boolean>;
  getCode(): Promise<string>;
  sub: (fn: (sess: ICodeSession) => void) => () => void;
}

export interface IRenderApp {
  root?: Root;
  rootElement?: HTMLDivElement;
  App?: FlexibleComponentType;
  codeSpace?: string;
  transpiled?: string;
  code?: string;
}

export interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: FlexibleComponentType;
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

export type IframeMessage = {
  type: "run";
  requestId: string;
  i: number;
  transpiled: string;
} | {
  type: "runResponse";
  requestId: string;
  html: string;
  css: string;
} | {
  type: "render";
  requestId: string;
} | {
  type: "rendered";
  requestId: string;
  data: {
    html: string;
    css: string;
  };
} | {
  type: "error";
  requestId: string;
  error: string;
} | {
  type: "screenShot";
  requestId: string;
  imageData: ImageData;
};

export type LanguageMap = Record<string, string>;

// Basic types
type Role = "user" | "system" | "assistant";

// Image-specific types
interface ImageUrl {
  url: string;
}

// Content part interfaces
export interface TextPart {
  type: "text";
  text: string;
}

export interface ImageUrlPart {
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
export type MessageContent = string | MessagePart[] | TextPart

// Main message interface
export interface Message {
  id: string;
  role: Role;
  type?: string;
  content: MessageContent;
}

// Utility type for cases where you might have a simple string content
export type SimpleMessage = Omit<Message, "content"> & { content: string; };

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
  isStreaming: boolean;
  input: string;
  cSess: ICode;
  setInput: (input: string) => void;
  handleSendMessage: (props: HandleSendMessageProps) => Promise<void>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
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
  onNewPrompt: (prompt: string) => void;
}

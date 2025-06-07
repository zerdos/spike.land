import type { EmotionCache } from "@emotion/cache";
import type { ComponentType } from "react";
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
  prompt: string;
  images: ImageData[];
  cSess: ICode;
}

export interface MessageInputProps {
  input: string;
  cSess: ICode;
  isDarkMode: boolean;
  setInput: (value: string) => void;

  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  isScreenshotLoading: boolean;

  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  screenshot: () => Promise<ImageData>;
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
  setSession: (sess: ICodeSession & { sender?: string; }) => void;
  getSession: () => Promise<ICodeSession>;
  init: () => Promise<ICodeSession>;
  screenshot: () => Promise<ImageData>;
  addMessageChunk: (chunk: string) => void;
  getMessages: () => Message[];
  addMessage: (newMessage: Message) => boolean;
  removeMessages: () => boolean;
  // currentCodeWithExtraModels: () => Promise<string>;
  // setModelsByCurrentCode: (code: string) => Promise<string>;
  setCode(
    rawCode: string,
    skipRunning?: boolean,
    replaceIframe?: (newIframe: HTMLIFrameElement) => void,
  ): Promise<string>;
  getCode(): Promise<string>;
  getCodeSpace(): string;
  sub: (fn: (sess: ICodeSession) => void) => () => void;
}

export interface IRenderApp {
  root?: Root;
  rootElement?: HTMLDivElement;
  App: FlexibleComponentType | undefined;
  codeSpace: string | undefined;
  transpiled: string | undefined;
  code: string | undefined;
}

export interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: FlexibleComponentType;
  cssCache: EmotionCache;
  cleanup: () => void;
  toHtmlAndCss: (
    renderedNew: RenderedApp,
  ) => Promise<{ css: string; html: string; }>;
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
  type: "screenshot";
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
    mediaType: string;
    data: string;
  };
}

/**
 * Supported message types in the messaging system
 */
export enum MessageType {
  /** Regular text message */
  TEXT = "text",
  /** Command message for system operations */
  COMMAND = "command",
  /** Status update message */
  STATUS = "status",
  /** Error message */
  ERROR = "error",
}
/**
 * Response structure for message handling operations
 */
export interface MessageResponse {
  /** Indicates if the operation was successful */
  success: boolean;
  /** Optional data returned from successful operations */
  data?: unknown;
  /** Error message in case of failure */
  error?: string;
}

/**
 * Configuration options for the MessageHandler service
 */
export interface MessageHandlerConfig {
  /** Whether to log errors to console (default: true) */
  logErrors?: boolean;
  /** Maximum number of retries for failed operations (default: 3) */
  maxRetries?: number;
  /** Timeout in milliseconds for operations (default: 5000) */
  timeout?: number;
}

export type MessagePart = TextPart | ImageUrlPart | ImagePart;
export type MessageContent = string | MessagePart[];

// Main message interface
export interface Message {
  id: string;
  role: Role;
  type?: MessageType;
  content: MessageContent;
}

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
  setEditingMessageId: (id: string) => void;
  onClose: () => void;
  isDarkMode: boolean;
  messages: Message[];
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  isStreaming: boolean;
  input: string;
  cSess: ICode;
  setInput: (input: string) => void;
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
  screenshot: () => Promise<ImageData>;
}

export type IExtraModelsResult = Record<string, string>;

export interface IModelManager {
  getModel(codeSpace: string): ICode | undefined;
  setModel(codeSpace: string, model: ICode): void;
  updateModelsByCode(newCodes: string): Promise<string>;
  getCurrentCodeWithExtraModels(): Promise<string>;
  release(): Promise<void>;
}

export interface ChatContainerProps {
  messages: Message[];
  setEditingMessageId: (id: string) => void;
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

# src/@/components/app/ai-building-overlay.d.ts

```ts
interface AIBuildingOverlayProps {
  codeSpace: string;
}
export declare function AIBuildingOverlay(
  { codeSpace }: AIBuildingOverlayProps,
): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
```

# src/@/components/app/analysis.d.ts

```ts
import React from "react";
interface AnalysisProps {
  content: string;
}
export declare const Analysis: React.FC<AnalysisProps>;
declare const ReactAnalysis: React.FC;
export default ReactAnalysis;
```

# src/@/components/app/chat-container.d.ts

```ts
import type { ChatContainerProps } from "@/lib/interfaces";
import React from "react";
export declare const ChatContainer: React.FC<ChatContainerProps>;
export default ChatContainer;
```

# src/@/components/app/chat-drawer.d.ts

```ts
import type { ChatDrawerProps } from "@/lib/interfaces";
import React from "react";
export declare const ChatDrawer: React.FC<ChatDrawerProps>;
export default ChatDrawer;
```

# src/@/components/app/chat-header.d.ts

```ts
import type { ChatHeaderProps } from "@/lib/interfaces";
import React from "react";
export declare const ChatHeader: React.FC<ChatHeaderProps>;
```

# src/@/components/app/chat-message.d.ts

```ts
import type { Message } from "@/lib/interfaces";
import React from "react";
interface ChatMessageProps {
  message: Message;
  isSelected: boolean;
  onDoubleClick: () => void;
  isEditing: boolean;
  onNewPrompt: (prompt: string) => void;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
  isDarkMode: boolean;
}
export declare const ChatMessage: React.NamedExoticComponent<ChatMessageProps>;
export default ChatMessage;
```

# src/@/components/app/code-block-lazy.d.ts

```ts
import type { CodeBlockProps } from "@/external/CodeBlock";
import type { FC } from "react";
export declare const CodeBlock: FC<CodeBlockProps>;
```

# src/@/components/app/diff-editor.d.ts

```ts
import type { FC } from "react";
interface DiffViewerProps {
  original: string;
  modified: string;
}
export declare const DiffViewer: FC<DiffViewerProps>;
declare const DiffEditor: FC;
export default DiffEditor;
```

# src/@/components/app/error-boundary.d.ts

```ts
import React from "react";
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}
export declare class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  codeSpace?: string;
}, ErrorBoundaryState> {
  constructor(props: {
    children: React.ReactNode;
    codeSpace?: string;
  });
  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
    error: Error;
  };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
  render():
    | string
    | number
    | bigint
    | boolean
    | Iterable<React.ReactNode>
    | Promise<
      | string
      | number
      | bigint
      | boolean
      | React.ReactPortal
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
    >
    | import("@emotion/react/jsx-runtime").JSX.Element
    | null
    | undefined;
}
export default ErrorBoundary;
```

# src/@/components/app/iframe-wrapper.d.ts

```ts
import React from "react";
export declare const IframeWrapper: React.FC<{
  codeSpace: string;
  fullScreen: boolean;
}>;
```

# src/@/components/app/message-input.d.ts

```ts
import type { MessageInputProps } from "@/lib/interfaces";
import React from "react";
export declare const MessageInput: React.FC<MessageInputProps>;
```

# src/@/components/app/suggestions.d.ts

```ts
interface Suggestion {
  title: string;
  description: string;
}
interface SuggestionsProps {
  content: string;
  onAction?: (suggestion: Suggestion) => void;
}
export declare const Suggestions: React.FC<SuggestionsProps>;
declare const SuggestionsExample: React.FC;
export default SuggestionsExample;
```

# src/@/components/app/text-to-speech.d.ts

```ts
import type { FC } from "react";
export declare const TextToSpeech: FC;
export default TextToSpeech;
```

# src/@/components/app/wrapper.d.ts

```ts
import React from "react";
interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
  scale?: number;
}
export declare const Wrapper: React.FC<WrapperProps>;
export {};
```

# src/@/config/workflow-config.d.ts

```ts
export declare const MODEL_NAME = "claude-3-7-sonnet-20250219";
export declare const MODEL_MAX_TOKENS = 4096;
export declare const MODEL_TEMPERATURE = 0;
export declare const DEFAULT_RETURN_MODIFIED_CODE = false;
export declare const SMALL_FILE_THRESHOLD = 1024;
export declare const COMPLEX_CHANGE_THRESHOLD = 500;
export declare const SIGNIFICANT_CHANGE_RATIO = 0.2;
export declare const COMPRESSION_THRESHOLD = 10240;
export declare const ANTHROPIC_API_CONFIG: {
  apiKey: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
  getApiUrl: (origin: string) => string;
};
```

# src/@/external/clerk.d.ts

```ts
export * from "@clerk/clerk-react";
```

# src/@/external/CodeBlock.d.ts

```ts
import type { FC } from "react";
export interface CodeBlockProps {
  language: string;
  value: string;
  title?: string;
}
export declare const CodeBlock: FC<CodeBlockProps>;
declare const ExampleCodeBlock: () => import("@emotion/react/jsx-runtime").JSX.Element;
export default ExampleCodeBlock;
```

# src/@/external/html2canvas.d.ts

```ts
import htmlCanvas from "html2canvas-pro";
export default htmlCanvas;
```

# src/@/external/icons.d.ts

```ts
import { FaDownload } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import {
  MdFullscreen,
  MdPhoneAndroid,
  MdQrCode,
  MdShare,
  MdTabletAndroid,
  MdTv,
} from "react-icons/md";
export {
  FaDownload,
  IoClose,
  MdFullscreen,
  MdPhoneAndroid,
  MdQrCode,
  MdShare,
  MdTabletAndroid,
  MdTv,
};
```

# src/@/external/immutable.d.ts

```ts
export { hash, Record } from "immutable";
```

# src/@/external/lucide-react.d.ts

```ts
export {
  AlertCircle,
  Bot,
  Camera,
  Check,
  FullscreenIcon,
  History,
  Image,
  Moon,
  RefreshCw,
  Send,
  Sidebar,
  Sun,
  Upload,
  X,
} from "lucide-react";
```

# src/@/external/Markdown.d.ts

```ts
import React from "react";
interface MarkdownWithReadAloudProps {
  children: string;
  className?: string;
}
declare const MarkdownWithReadAloud: React.FC<MarkdownWithReadAloudProps>;
export default MarkdownWithReadAloud;
```

# src/@/external/mui-material.d.ts

```ts
export { Fab, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
```

# src/@/external/react-qrious.d.ts

```ts
export { QRious } from "react-qrious";
```

# src/@/external/reactSyntaxHighlighter.d.ts

```ts
export { Prism } from "react-syntax-highlighter";
```

# src/@/external/reactSyntaxHighlighterPrism.d.ts

```ts
export { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
```

# src/@/external/record-rtc.d.ts

```ts
import recordRTC from "recordrtc";
export default recordRTC;
```

# src/@/external/render-app.d.ts

```ts
export { renderApp } from "@/lib/render-app";
```

# src/@/external/shared-w-polyfill.d.ts

```ts
declare class SharedWorkerPolyfill {
  private worker;
  port: MessagePort;
  constructor(url: string, opts?: WorkerOptions);
  private initializeWorker;
  get onmessage(): ((this: MessagePort, ev: MessageEvent) => void) | null;
  set onmessage(value: ((this: MessagePort, ev: MessageEvent) => void) | null);
  get onmessageerror(): ((this: MessagePort, ev: MessageEvent) => void) | null;
  set onmessageerror(value: ((this: MessagePort, ev: MessageEvent) => void) | null);
  postMessage: (message: unknown, transfer?: Transferable[]) => void;
  terminate(): void;
  close(): void;
  get onerror(): ((this: AbstractWorker, ev: ErrorEvent) => void) | null;
  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => void) | null);
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
  dispatchEvent(event: Event): boolean;
}
declare const WorkerToExport: {
  new(scriptURL: string | URL, options?: string | WorkerOptions): SharedWorker;
  prototype: SharedWorker;
} | typeof SharedWorkerPolyfill;
export default WorkerToExport;
```

# src/@/external/use-local-storage.d.ts

```ts
export declare function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void];
export default useLocalStorage;
```

# src/@/external/worker-mock.d.ts

```ts
declare class MockWorker {
  onmessage: ((this: Worker, ev: MessageEvent) => void) | null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => void) | null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => void) | null;
  addEventListener(): void;
  removeEventListener(): void;
  postMessage(): void;
  terminate(): void;
  dispatchEvent(event: Event): boolean;
}
declare class MockSharedWorker extends MockWorker {
  port: {
    onmessage: null;
    onmessageerror: null;
    close: () => void;
    postMessage: () => void;
    start: () => void;
    addEventListener: () => void;
    removeEventListener: () => void;
    dispatchEvent: (event: Event) => boolean;
  };
}
export { MockSharedWorker, MockWorker };
```

# src/@/handlers/sw-handlers.d.ts

```ts
import { CustomServiceWorkerGlobalScope } from "../types/service-worker";
export declare class ServiceWorkerHandlers {
  private readonly sw;
  private readonly fileCacheManager;
  private readonly configManager;
  constructor(sw: CustomServiceWorkerGlobalScope);
  handleInstall(): Promise<void>;
  handleActivate(): Promise<void>;
  handleFetch(event: FetchEvent): void;
  private handleServeRequest;
}
```

# src/@/hooks/use-chat.d.ts

```ts
interface ChatMessage {
  sender: string;
  text: string;
}
interface MessagePayload {
  type: string;
  to?: string;
  [key: string]: unknown;
}
export declare const useChat: () => {
  sendMessage: (payload: MessagePayload) => void;
  chatHistory: ChatMessage[];
};
export {};
```

# src/@/hooks/use-code-space.d.ts

```ts
export declare const getCodeSpace: (pathname: string) => string;
```

# src/@/hooks/use-dark-mode.d.ts

```ts
export declare const useDarkMode: () => {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};
```

# src/@/hooks/use-dictation.d.ts

```ts
interface UseDictationOptions {
  silenceThreshold?: number;
  maxSilenceDuration?: number;
}
export declare function useDictation(
  defaultValue?: string,
  options?: UseDictationOptions,
): readonly [string, import("react").Dispatch<import("react").SetStateAction<string>>, {
  readonly isRecording: boolean;
  readonly isProcessing: boolean;
  readonly error: string;
}];
export {};
```

# src/@/hooks/use-local-storage.d.ts

```ts
export { useLocalStorage } from "@uidotdev/usehooks";
```

# src/@/hooks/use-mobile.d.ts

```ts
export declare function useIsMobile(): boolean;
```

# src/@/hooks/use-search-params.d.ts

```ts
export declare const useSearchParams: () => {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  size: number;
  append(name: string, value: string): void;
  append(name: string, value: string): void;
  append(name: string, value: string): void;
  delete(name: string, value?: string): void;
  delete(name: string, value?: string): void;
  delete(name: string, value?: string): void;
  getAll(name: string): string[];
  getAll(name: string): string[];
  getAll(name: string): string[];
  has(name: string, value?: string): boolean;
  has(name: string, value?: string): boolean;
  has(name: string, value?: string): boolean;
  sort(): void;
  sort(): void;
  sort(): void;
  toString(): string;
  toString(): string;
  toString(): string;
  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any,
  ): void;
  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any,
  ): void;
  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any,
  ): void;
  entries(): URLSearchParamsIterator<[string, string]>;
  keys(): URLSearchParamsIterator<string>;
  values(): URLSearchParamsIterator<string>;
  [Symbol.iterator](): URLSearchParamsIterator<[string, string]>;
};
```

# src/@/hooks/use-theme.d.ts

```ts
export {};
```

# src/@/hooks/use-toast.d.ts

```ts
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import * as React from "react";
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};
declare const _actionTypes: {
  readonly ADD_TOAST: "ADD_TOAST";
  readonly UPDATE_TOAST: "UPDATE_TOAST";
  readonly DISMISS_TOAST: "DISMISS_TOAST";
  readonly REMOVE_TOAST: "REMOVE_TOAST";
};
type ActionType = typeof _actionTypes;
type Action = {
  type: ActionType["ADD_TOAST"];
  toast: ToasterToast;
} | {
  type: ActionType["UPDATE_TOAST"];
  toast: Partial<ToasterToast>;
} | {
  type: ActionType["DISMISS_TOAST"];
  toastId?: ToasterToast["id"];
} | {
  type: ActionType["REMOVE_TOAST"];
  toastId?: ToasterToast["id"];
};
interface State {
  toasts: ToasterToast[];
}
export declare const reducer: (state: State, action: Action) => State;
type Toast = Omit<ToasterToast, "id">;
declare function toast({ ...props }: Toast): {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};
declare function useToast(): {
  toast: typeof toast;
  dismiss: (toastId?: string) => void;
  toasts: ToasterToast[];
};
export { toast, useToast };
```

# src/@/hooks/use-window-size.d.ts

```ts
declare function useWindowSize(delay?: number): {
  width: number;
  height: number;
};
export default useWindowSize;
```

# src/@/lib/ai-config.d.ts

```ts
export interface SystemParams {
  fileName: string;
  fileContent: string;
  userPrompt: string;
}
export interface ReminderParams {
  userPrompt: string;
  fileName: string;
  fileContent: string;
}
export declare function anthropicSystem(params: SystemParams): string;
export declare function reminder(params: ReminderParams): string;
```

# src/@/lib/ai-handler.d.ts

```ts
import type { Message } from "@/lib/interfaces";
export declare class AIHandler {
  private aiService;
  constructor(setIsStreaming?: (isStreaming: boolean) => void);
  sendToAnthropic(messages: Message[], onUpdate: (code: string) => void): Promise<Message>;
  sendToGpt4o(messages: Message[], onUpdate: (code: string) => void): Promise<Message>;
  prepareClaudeContent(
    content: string,
    messages: Message[],
    currentCode: string,
    codeSpace: string,
  ): string;
}
```

# src/@/lib/ai-service.d.ts

```ts
import type { Message } from "@/lib/interfaces";
export interface AIServiceConfig {
  anthropicEndpoint: string;
  openAIEndpoint: string;
  gpt4oEndpoint: string;
  updateThrottleMs: number;
  retryWithClaudeEnabled: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
}
export declare class AIService {
  private _config;
  constructor(config: AIServiceConfig);
  sendToAnthropic(messages: Message[], onUpdate: (code: string) => void): Promise<Message>;
  sendToGpt4o(messages: Message[], onUpdate: (code: string) => void): Promise<Message>;
  prepareClaudeContent(params: {
    content: string;
    messages: Message[];
    codeNow: string;
    codeSpace: string;
  }): string;
}
```

# src/@/lib/broadcast-channel.d.ts

```ts
export declare const getBroadcastChannel: (codeSpace: string) => BroadcastChannel;
```

# src/@/lib/chat-utils.d.ts

```ts
import type { Message } from "@/lib/interfaces";
export declare function messagesPush(messages: Message[], newMessage: Message): Message[];
export declare const formatCodeAsSection: (codeSpace: string, code: string) => string;
export declare const extractCodeModification: (response: string) => string[];
export declare const loadMessages: (codeSpace: string) => Message[];
export declare const updateSearchReplace: (instructions: string, codeNow: string) => string;
export declare const replaceFirstCodeMod: (instructions: string, codeNow: string) => string;
```

# src/@/lib/common-functions.d.ts

```ts
import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess";
export declare function sanitizeSession(session: ICodeSession): ICodeSession;
export declare function generateSessionPatch(
  newSession: ICodeSession,
  oldSession: ICodeSession,
): CodePatch;
export declare function applySessionPatch(oldSession: ICodeSession, patch: CodePatch): ICodeSession;
export declare function computeSessionHash(session: ICodeSession): string;
export declare function sessionToJSON(session: ICodeSession): string;
```

# src/@/lib/context-manager.d.ts

```ts
export interface ProjectContext {
  [key: string]: string;
  currentTask: string;
  techStack: string;
  completionCriteria: string;
  codeStructure: string;
  currentDraft: string;
  adaptiveInstructions: string;
  errorLog: string;
  progressTracker: string;
}
declare class ContextManager {
  private codeSpace;
  private currentTask;
  private techStack;
  private completionCriteria;
  private codeStructure;
  private currentDraft;
  private adaptiveInstructions;
  private errorLog;
  private progressTracker;
  constructor(codeSpace: string);
  updateContext(key: string, content: string): void;
  getContext(key: string): string;
  getFullContext(): ProjectContext;
  clearContext(): void;
}
export { ContextManager };
```

# src/@/lib/debounce.d.ts

```ts
interface DebounceOptions {
  signal?: AbortSignal;
  edges?: Array<"leading" | "trailing">;
}
interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  schedule: () => void;
  cancel: () => void;
  flush: () => void;
}
export declare const debounce: <T extends (...args: unknown[]) => unknown>(
  func: T,
  debounceMs: number,
  { signal, edges }?: DebounceOptions,
) => DebouncedFunction<T>;
export { type DebouncedFunction, type DebounceOptions };
```

# src/@/lib/diff-utils.d.ts

```ts
export declare const isDiffContent: (content: string) => boolean;
export declare function extractDiffContent(content: string): {
  original: string;
  modified: string;
};
export declare function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string,
): string;
```

# src/@/lib/enhanced-fetch.d.ts

```ts
export declare const serverFetchUrl = "/api/server-fetch";
export declare const enhancedFetch: (
  url: RequestInfo | URL,
  options?: RequestInit,
) => Promise<Response>;
```

# src/@/lib/errors.d.ts

```ts
export declare class AppError extends Error {
  constructor(message: string);
}
export declare class WebSocketError extends AppError {
  readonly originalError?: Error | undefined;
  constructor(message: string, originalError?: Error | undefined);
}
export declare class DOMError extends AppError {
  readonly elementId?: string | undefined;
  constructor(message: string, elementId?: string | undefined);
}
export declare class RouterError extends AppError {
  readonly path?: string | undefined;
  constructor(message: string, path?: string | undefined);
}
export declare class MessageHandlingError extends AppError {
  readonly data?: unknown | undefined;
  constructor(message: string, data?: unknown | undefined);
}
export declare const getErrorMessage: (error: unknown) => string;
```

# src/@/lib/get-parts.d.ts

```ts
import type { ParsingState } from "@/lib/interfaces";
interface ChatMessagePart {
  type: "text" | "code";
  content: string;
  language?: string;
}
export declare const getPartsStreaming: (text: string, isUser: boolean, state?: ParsingState) => {
  parts: ChatMessagePart[];
  state: ParsingState;
};
export {};
```

# src/@/lib/hydrate.d.ts

```ts
import type { ICode } from "@/lib/interfaces";
export declare const renderPreviewWindow: ({ codeSpace, cSess, AppToRender }: {
  codeSpace: string;
  cSess: ICode;
  AppToRender: React.FC<{
    codeSpace: string;
    cSess: ICode;
  }>;
}) => Promise<import("@/lib/interfaces").RenderedApp | null>;
export declare const setupServiceWorker: () => Promise<
  ServiceWorker | ServiceWorkerRegistration | undefined
>;
export declare const initializeApp: () => Promise<void>;
```

# src/@/lib/import-map.d.ts

```ts
export type ImportMap = {
  imports: Record<string, string>;
};
export declare const importMap: ImportMap;
```

# src/@/lib/importmap-utils-acorn.d.ts

```ts
export type ImportMap = {
  imports: Record<string, string>;
};
export declare const importMap: ImportMap;
export declare function importMapReplace(code: string, origin?: string, impMap?: ImportMap): string;
export default importMap;
```

# src/@/lib/importmap-utils-old.d.ts

```ts
import { ImportMap } from "@/lib/import-map";
export declare const importMap: ImportMap;
export declare function importMapReplace(code: string, origin: string, impMap?: ImportMap): string;
export default importMap;
```

# src/@/lib/importmap-utils.d.ts

```ts
export type ImportMap = {
  imports: Record<string, string>;
};
export declare const importMap: ImportMap;
export declare function importMapReplace(code: string, origin?: string, impMap?: ImportMap): string;
export default importMap;
```

# src/@/lib/interfaces.d.ts

```ts
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
  cSess: ICode;
  isDarkMode: boolean;
  setInput: (value: string) => void;
  handleSendMessage: (props: HandleSendMessageProps) => Promise<void>;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  screenshot: () => Promise<ImageData>;
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
  setSession: (sess: ICodeSession) => void;
  getSession: () => Promise<ICodeSession>;
  init: () => Promise<ICodeSession>;
  screenshot: () => Promise<ImageData>;
  addMessageChunk: (chunk: string) => void;
  getMessages: () => Message[];
  setMessages: (messages: Message[]) => boolean;
  setCode(rawCode: string, skipRunning?: boolean, transpiled?: string): Promise<string | boolean>;
  getCode(): Promise<string>;
  getCodeSpace(): string;
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
  type: "screenshot";
  requestId: string;
  imageData: ImageData;
};
export type LanguageMap = Record<string, string>;
type Role = "user" | "system" | "assistant";
interface ImageUrl {
  url: string;
}
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
export declare enum MessageType {
  TEXT = "text",
  COMMAND = "command",
  STATUS = "status",
  ERROR = "error",
}
export interface MessageResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
export interface MessageHandlerConfig {
  logErrors?: boolean;
  maxRetries?: number;
  timeout?: number;
}
export type MessagePart = TextPart | ImageUrlPart | ImagePart;
export type MessageContent = string | MessagePart[];
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
  screenshot: () => Promise<ImageData>;
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
export {};
```

# src/@/lib/json-diff.d.ts

```ts
import type { ICodeSession } from "@/lib/interfaces";
type DiffOperation = "EQUAL" | "INSERT" | "DELETE" | "REPLACE";
export interface DiffEntry {
  operation: DiffOperation;
  path: string[];
  value?: unknown;
  oldValue?: unknown;
}
export declare function createDiff(oldState: ICodeSession, newState: ICodeSession): DiffEntry[];
export declare function applyDiff<T>(baseState: T, diffs: DiffEntry[]): T;
export {};
```

# src/@/lib/make-sess.d.ts

```ts
import type { ICodeSession } from "@/lib/interfaces";
import { createDiff } from "@/lib/text-diff";
export { createDiff };
export interface CodePatch {
  oldHash: string;
  hashCode: string;
  patch?: ReturnType<typeof createDiff>;
}
declare class SessionPatcher {
  static computeSessionHash(cx: ICodeSession): string;
  static sanitizeSession(p: unknown): ICodeSession;
  static sessionToJSON(s: ICodeSession): string;
  static applySessionPatch(sess: ICodeSession, codePatch: CodePatch): ICodeSession;
  static generateSessionPatch(oldSess: ICodeSession, newSess: ICodeSession): CodePatch;
}
export declare const computeSessionHash: (s: ICodeSession) => string;
export declare const sanitizeSession: typeof SessionPatcher.sanitizeSession;
export declare const sessionToJSON: typeof SessionPatcher.sessionToJSON;
export declare const applySessionPatch: typeof SessionPatcher.applySessionPatch;
export declare const generateSessionPatch: typeof SessionPatcher.generateSessionPatch;
```

# src/@/lib/md5.d.ts

```ts
export declare function md5(input: object | string): string;
```

# src/@/lib/memfs.d.ts

```ts
type FileSystemEntry = Partial<FileSystemHandle> & {
  relativePath: string;
};
export declare const getDirectoryEntriesRecursive: (
  directoryHandle: FileSystemDirectoryHandle,
  relativePath?: string,
) => Promise<Record<string, FileSystemEntry>>;
export declare const getDirectoryHandleAndFileName: (filePath: string) => Promise<{
  dirHandle: FileSystemDirectoryHandle;
  fileName: string | undefined;
}>;
export declare const readdir: (filePath: string) => Promise<string[]>;
export declare const writeFile: (filePath: string, content: string) => Promise<void>;
export declare const readFile: (filePath: string) => Promise<string>;
export declare const unlink: (filePath: string) => Promise<void>;
export declare const mkdir: (filePath: string) => Promise<void>;
export declare const stat: (filePath: string) => Promise<
  {
    name: string;
    kind: "file";
    size: number;
    type: string;
    lastModified: number;
    relativePath: string;
    handle: FileSystemFileHandle;
  } | {
    name: string;
    kind: "directory";
    relativePath: string;
    entries: Record<string, FileSystemEntry>;
    handle: FileSystemDirectoryHandle;
  } | null
>;
export declare const cwd: () => Promise<string>;
export declare const readFileSync: (filePath: string) => string;
declare const FS: {
  readFileSync: (filePath: string) => string;
  readFile: (filePath: string) => Promise<string>;
  unlink: (filePath: string) => Promise<void>;
  mkdir: (filePath: string) => Promise<void>;
  writeFile: (filePath: string, content: string) => Promise<void>;
  readdir: (filePath: string) => Promise<string[]>;
  stat: (filePath: string) => Promise<
    {
      name: string;
      kind: "file";
      size: number;
      type: string;
      lastModified: number;
      relativePath: string;
      handle: FileSystemFileHandle;
    } | {
      name: string;
      kind: "directory";
      relativePath: string;
      entries: Record<string, FileSystemEntry>;
      handle: FileSystemDirectoryHandle;
    } | null
  >;
  cwd: () => Promise<string>;
};
export default FS;
```

# src/@/lib/prettier.d.ts

```ts
export declare const addSomeFixesIfNeeded: (rawCode: string) => string;
export declare const prettierJs: ({ code, toThrow }: {
  code: string;
  toThrow: boolean;
}) => Promise<string>;
export declare const prettierCss: (inputCSS: string) => Promise<string>;
```

# src/@/lib/process-image.d.ts

```ts
import type { ImageData } from "@/lib/interfaces";
export declare const processImage: (file: File) => Promise<ImageData>;
```

# src/@/lib/queued-fetch.d.ts

```ts
export declare class QueuedFetch {
  private queue;
  private ongoingRequests;
  private maxConcurrent;
  private limitedNumberOfRequests;
  private maxNumberOfRequests;
  private retries;
  private retryDelay;
  private fetchWithRetry;
  constructor(
    maxConcurrent?: number,
    maxNumberOfRequests?: number,
    _retries?: number,
    _retryDelay?: number,
  );
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  private processQueue;
}
```

# src/@/lib/render-app.d.ts

```ts
import type { FlexibleComponentType, IRenderApp, RenderedApp } from "@/lib/interfaces";
export declare function AppWithScreenSize({ AppToRender }: {
  AppToRender: FlexibleComponentType;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const importFromString: (code: string) => Promise<FlexibleComponentType>;
declare global {
  let renderedApps: WeakMap<HTMLElement, RenderedApp>;
}
declare function renderApp(
  { rootElement, codeSpace, transpiled, App, code, root }: IRenderApp,
): Promise<RenderedApp | null>;
export { renderApp };
```

# src/@/lib/render-messages.d.ts

```ts
interface ChatMessageBlockProps {
  text: string;
  isUser: boolean;
  onNewPrompt: (prompt: string) => void;
}
export declare const ChatMessageBlock: import("react").NamedExoticComponent<ChatMessageBlockProps>;
export default ChatMessageBlock;
```

# src/@/lib/routes.d.ts

```ts
export declare const routes: {
  "/": string;
  "/start": string;
};
```

# src/@/lib/serve-with-cache.d.ts

```ts
export declare const serveWithCache: (
  files: Record<string, string>,
  cacheToUse: () => Promise<Cache>,
) => {
  isAsset: (request: Request) => boolean;
  shouldBeCached: (request: Request) => boolean;
  serve: (
    request: Request,
    assetFetcher: (req: Request, waitUntil: (p: Promise<unknown>) => void) => Promise<Response>,
    waitUntil: (p: Promise<unknown>) => void,
  ) => Promise<Response>;
};
```

# src/@/lib/shared-w-polyfill.d.ts

```ts
declare class SharedWorkerPolyfill {
  private worker;
  port: MessagePort;
  constructor(url: string, opts?: WorkerOptions);
  private initializeWorker;
  get onmessage(): ((this: MessagePort, ev: MessageEvent) => void) | null;
  set onmessage(value: ((this: MessagePort, ev: MessageEvent) => void) | null);
  get onmessageerror(): ((this: MessagePort, ev: MessageEvent) => void) | null;
  set onmessageerror(value: ((this: MessagePort, ev: MessageEvent) => void) | null);
  postMessage: (message: unknown, transfer?: Transferable[]) => void;
  terminate(): void;
  close(): void;
  get onerror(): ((this: AbstractWorker, ev: ErrorEvent) => void) | null;
  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => void) | null);
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
  dispatchEvent(event: Event): boolean;
}
declare const WorkerToExport: {
  new(scriptURL: string | URL, options?: string | WorkerOptions): SharedWorker;
  prototype: SharedWorker;
} | typeof SharedWorkerPolyfill;
export default WorkerToExport;
```

# src/@/lib/shared.d.ts

```ts
import type { HandleSendMessageProps, ICodeSession } from "@/lib/interfaces";
import type { MyBuildOptions } from "@/lib/transpile";
export declare const prettierToThrow: ({ code, toThrow }: {
  code: string;
  toThrow: boolean;
}) => Promise<string>;
export declare const format: (code: string) => Promise<string>;
export declare const ata: ({ code, originToUse }: {
  code: string;
  originToUse: string;
}) => Promise<
  Array<{
    content: string;
    filePath: string;
  }>
>;
export declare const prettierCss: (code: string) => Promise<string>;
export declare const tsx: (code: string) => Promise<
  Array<{
    content: string;
    filePath: string;
  }>
>;
export declare const handleSendMessage: (
  { messages, codeSpace, prompt, images, code }: HandleSendMessageProps,
) => Promise<void>;
export declare const createWorkflow: (q: string) => Promise<string>;
export declare const transpile: ({ code, originToUse, wasmModule }: {
  code: string;
  originToUse: string;
  wasmModule?: WebAssembly.Module;
}) => Promise<string>;
export declare const build: (
  { codeSpace, origin, format, splitting, entryPoints, external }: MyBuildOptions,
) => Promise<string>;
export declare const connect: ({ signal, sess }: {
  signal: string;
  sess: ICodeSession;
}) => Promise<() => void>;
```

# src/@/lib/text-diff.d.ts

```ts
import { ICodeSession } from "@/lib/interfaces";
import { Operation } from "fast-json-patch";
export interface ICodeSessionDiff extends Array<Operation> {
}
export declare function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff;
export declare function applyDiff(sess: ICodeSession, patch: ICodeSessionDiff): ICodeSession;
```

# src/@/lib/throttle.d.ts

```ts
import { type DebouncedFunction, type DebounceOptions } from "@/lib/debounce";
interface ThrottleOptions extends Omit<DebounceOptions, "edges"> {
  edges?: Array<"leading" | "trailing">;
}
declare function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  throttleMs: number | undefined,
  { signal, edges }?: ThrottleOptions,
): DebouncedFunction<T>;
export { throttle, type ThrottleOptions };
```

# src/@/lib/transferables.d.ts

```ts
export declare const TypedArray: unknown;
export declare const AudioData: {
  new(init: AudioDataInit): AudioData;
  prototype: AudioData;
};
export declare const ImageBitmap: {
  new(): ImageBitmap;
  prototype: ImageBitmap;
};
export declare const VideoFrame: {
  new(image: CanvasImageSource, init?: VideoFrameInit): VideoFrame;
  new(data: AllowSharedBufferSource, init: VideoFrameBufferInit): VideoFrame;
  prototype: VideoFrame;
};
export declare const OffscreenCanvas: {
  new(width: number, height: number): OffscreenCanvas;
  prototype: OffscreenCanvas;
};
export declare const RTCDataChannel: {
  new(): RTCDataChannel;
  prototype: RTCDataChannel;
};
export declare const MessageChannel: {
  new(): MessageChannel;
  prototype: MessageChannel;
};
export declare const ReadableStream: {
  new(underlyingSource: UnderlyingByteSource, strategy?: {
    highWaterMark?: number;
  }): ReadableStream<Uint8Array>;
  new<R = any>(
    underlyingSource: UnderlyingDefaultSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
  new<R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
  prototype: ReadableStream;
};
export declare const WritableStream: {
  new<W = any>(
    underlyingSink?: UnderlyingSink<W>,
    strategy?: QueuingStrategy<W>,
  ): WritableStream<W>;
  prototype: WritableStream;
};
export declare const TransformStream: {
  new<I = any, O = any>(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>,
  ): TransformStream<I, O>;
  prototype: TransformStream;
};
export declare const AVAILABLE_TRANSFERABLE_OBJECTS: {
  TransferableExists: boolean;
  StreamExists: boolean;
  ReadableStreamExists: boolean;
  WritableStreamExists: boolean;
  TransformStreamExists: boolean;
  MessageChannelExists: boolean;
  MessagePortExists: boolean;
  ArrayBufferExists: boolean;
  AudioDataExists: boolean;
  ImageBitmapExists: boolean;
  VideoFrameExists: boolean;
  OffscreenCanvasExists: boolean;
  RTCDataChannelExists: boolean;
};
export type TypeTypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;
export type TypeTransferable =
  | ArrayBufferLike
  | ArrayBuffer
  | MessagePort
  | ReadableStream
  | WritableStream
  | TransformStream
  | AudioData
  | ImageBitmap
  | VideoFrame
  | OffscreenCanvas
  | RTCDataChannel;
export declare function isSupported(): Promise<{
  channel: boolean;
  streams: boolean;
}>;
export declare function isObject(obj: unknown): obj is object | ((...args: unknown[]) => unknown);
export declare function isTypedArray(obj: unknown): obj is TypeTypedArray | DataView;
export declare function isStream(
  obj: unknown,
): obj is ReadableStream | WritableStream | TransformStream;
export declare function isMessageChannel(obj: unknown): obj is MessageChannel;
export declare function isTransferable(obj: unknown): obj is TypeTransferable;
export declare function filterOutDuplicates<T>(array: T[]): T[];
export declare function getTransferables(
  obj: unknown,
  streams?: boolean,
  maxCount?: number,
): TypeTransferable[];
export declare function getTransferable(
  obj: unknown,
  streams?: boolean,
  maxCount?: number,
): Generator<TypeTransferable | TypeTypedArray | MessageChannel | DataView>;
export declare function hasTransferables(
  obj: unknown,
  streams?: boolean,
  maxCount?: number,
): boolean;
```

# src/@/lib/transpile.d.ts

```ts
import type { BuildOptions } from "esbuild-wasm";
import { wasmFile } from "../../esbuildWASM";
export { wasmFile };
export type MyBuildOptions = BuildOptions & {
  codeSpace: string;
  origin: string;
  wasmModule?: WebAssembly.Module;
};
export declare const transpile: ({ code, originToUse, wasmModule }: {
  code: string;
  originToUse: string;
  wasmModule?: WebAssembly.Module;
}) => Promise<
  string | {
    error: unknown;
  }
>;
export declare const build: (
  { codeSpace, origin, entryPoints, external, splitting, wasmModule, metafile, format }:
    MyBuildOptions,
) => Promise<
  string | import("esbuild-wasm").OutputFile[] | {
    error: unknown;
  } | undefined
>;
```

# src/@/lib/tw-dev-setup.d.ts

```ts
interface ResourceLoader {
  init(): Promise<boolean>;
}
declare class ResourceLoaderImpl implements ResourceLoader {
  private static readonly IFRAME_PATH;
  private static initialized;
  init(): Promise<boolean>;
  private shouldLoadResources;
  private loadResources;
  private removeAllStyleBlocks;
}
export declare const resourceLoader: ResourceLoaderImpl;
export declare const init: () => Promise<boolean>;
export {};
```

# src/@/lib/use-archive.d.ts

```ts
export declare const getSpeedy2: () => Promise<void>;
export declare const useArchive: (codeSpace: string) => Promise<void>;
export declare const useSpeedy: (codeSpace: string) => Promise<void>;
```

# src/@/lib/utils.d.ts

```ts
import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
```

# src/@/lib/wait.d.ts

```ts
export declare function wait(delay: number): Promise<unknown>;
```

# src/@/tools/ast-code-modification.d.ts

```ts
import { z } from "zod";
export declare const astCodeModificationTool: import("@langchain/core/tools").DynamicStructuredTool<
  z.ZodObject<
    {
      operations: z.ZodArray<
        z.ZodObject<
          {
            type: z.ZodEnum<["add", "update", "delete", "move"]>;
            target: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodEnum<["before", "after", "replace", "inside"]>>;
            newTarget: z.ZodOptional<z.ZodString>;
          },
          "strip",
          z.ZodTypeAny,
          {
            target: string;
            type: "move" | "add" | "update" | "delete";
            code?: string | undefined;
            position?: "replace" | "inside" | "after" | "before" | undefined;
            newTarget?: string | undefined;
          },
          {
            target: string;
            type: "move" | "add" | "update" | "delete";
            code?: string | undefined;
            position?: "replace" | "inside" | "after" | "before" | undefined;
            newTarget?: string | undefined;
          }
        >,
        "many"
      >;
      hash: z.ZodString;
      filePath: z.ZodString;
    },
    "strip",
    z.ZodTypeAny,
    {
      filePath: string;
      hash: string;
      operations: {
        target: string;
        type: "move" | "add" | "update" | "delete";
        code?: string | undefined;
        position?: "replace" | "inside" | "after" | "before" | undefined;
        newTarget?: string | undefined;
      }[];
    },
    {
      filePath: string;
      hash: string;
      operations: {
        target: string;
        type: "move" | "add" | "update" | "delete";
        code?: string | undefined;
        position?: "replace" | "inside" | "after" | "before" | undefined;
        newTarget?: string | undefined;
      }[];
    }
  >
>;
```

# src/@/tools/code-modification-tools.d.ts

```ts
import { z } from "zod";
export declare const codeModificationTool: import("@langchain/core/tools").DynamicStructuredTool<
  z.ZodObject<
    {
      instructions: z.ZodString;
      hash: z.ZodString;
      returnModifiedCode: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    },
    "strip",
    z.ZodTypeAny,
    {
      instructions: string;
      hash: string;
      returnModifiedCode: boolean;
    },
    {
      instructions: string;
      hash: string;
      returnModifiedCode?: boolean | undefined;
    }
  >
>;
```

# src/@/types/chat-langchain.d.ts

```ts
import type { BaseMessage } from "@langchain/core/messages";
export interface AgentState {
  messages: BaseMessage[];
  code: string;
  origin: string;
  codeSpace: string;
  lastError: string;
  isStreaming: boolean;
  returnModifiedCode?: boolean;
  hash: string;
  filePath?: string;
}
export type CodeModification = string | {
  code?: string;
  error?: string;
  retryCount?: number;
  currentFileContent?: string;
  searchContent?: string;
  blockNumber?: number;
  totalBlocks?: number;
  hash: string;
};
```

# src/@/types/service-worker.d.ts

```ts
export interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  swVersion: string;
  files: Record<string, string>;
  fileCacheName: string;
}
export interface Config {
  killSwitch: boolean;
  version: string;
  swVersion: string;
  validUntil: number;
}
```

# src/@/types/sw-deps.d.ts

```ts
export type QueuedFetch = new(concurrency: number) => {
  fetch: (request: Request, init?: RequestInit) => Promise<Response>;
};
export type FakeServer = (request: Request) => Promise<Response>;
export type ServeWithCache = (files: Record<string, string>, cacheOpener: () => Promise<Cache>) => {
  isAsset: (request: Request) => boolean;
  serve: (
    request: Request,
    fetcher: (request: Request) => Promise<Response>,
    waitUntil: (promise: Promise<unknown>) => void,
  ) => Promise<Response>;
};
declare global {
  const fakeServer: FakeServer;
  const QueuedFetch: QueuedFetch;
  const serveWithCache: ServeWithCache;
  const importMap: Record<string, string>;
}
```

# src/@/types/workflow.d.ts

```ts
import type { StateGraphArgs } from "@langchain/langgraph/web";
import { AgentState } from "../workflows/chat-langchain";
export interface CodeChangeMetrics {
  sizeChange: number;
  lineCount: {
    original: number;
    modified: number;
  };
  changedLines: number;
  tokenSavings: number;
}
export interface ToolResponseMetadata {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError?: string;
  codeWasReturned: boolean;
}
export interface SearchReplaceBlock {
  search: string;
  replace: string;
}
export type WorkflowChannels = StateGraphArgs<AgentState>["channels"];
export type WorkflowContinueResult = "process" | "tools" | "end";
```

# src/@/utils/cache-utils.d.ts

```ts
export declare const CACHE_VERSION = "v1";
export declare const MAX_RETRY_ATTEMPTS = 3;
export declare const RETRY_DELAY = 1000;
export declare const MAX_CACHE_AGE: number;
export declare const CDN_CACHE_NAME = "jsdelivr-cache-v1";
export declare const CDN_DOMAIN = "data.jsdelivr.com";
export declare class CacheUtils {
  static retry<T>(operation: () => Promise<T>, retries?: number, delay?: number): Promise<T>;
  static setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T>;
  static setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T>;
  static cleanOldCaches(currentCacheName: string): Promise<void>;
  static handleCDNRequest(request: Request): Promise<Response>;
  static getMissingFiles(
    missing: Set<string>,
    cacheNames: string[],
    myCache: Cache,
  ): Promise<Set<string>>;
}
```

# src/@/utils/code-utils.d.ts

```ts
import { CodeChangeMetrics } from "@/types/workflow";
export declare const verifyCodeIntegrity: (code: string, expectedHash: string) => boolean;
export declare const shouldReturnFullCode: (instructions: string, currentCode: string) => boolean;
export declare const calculateCodeChanges: (
  original: string,
  modified: string,
) => CodeChangeMetrics;
export declare const logCodeChanges: (initialCode: string, finalCode: string) => void;
export declare const estimateTokenSavings: (code: string) => number;
```

# src/@/utils/config-manager.d.ts

```ts
import { Config } from "../types/service-worker";
export declare class ConfigManager {
  private static instance;
  private currentConfig;
  private configPromise;
  private constructor();
  static getInstance(): ConfigManager;
  getConfig(): Promise<Config>;
  private fetchConfig;
}
```

# src/@/utils/error-handlers.d.ts

```ts
export declare class WorkflowError extends Error {
  readonly context?: Record<string, unknown> | undefined;
  constructor(message: string, context?: Record<string, unknown> | undefined);
}
export declare function handleWorkflowError(error: unknown): WorkflowError;
export declare function createCodeIntegrityError(
  message: string,
  expectedHash: string,
  actualHash: string,
  codeLength: number,
): WorkflowError;
export declare function createCompilationError(
  error: string,
  hash?: string,
  modifiedCodeHash?: string,
): WorkflowError;
```

# src/@/utils/file-cache.d.ts

```ts
import { CustomServiceWorkerGlobalScope } from "../types/service-worker";
export declare class FileCacheManager {
  private readonly sw;
  private readonly filesByCacheKeys;
  constructor(sw: CustomServiceWorkerGlobalScope);
  getAllFileUrls(): Set<string>;
  validateFileHash(url: string, hash: string): Promise<void>;
  fetchAndCacheFile(url: string, queuedFetch: {
    fetch: (request: Request, init?: RequestInit) => Promise<Response>;
  }, myCache: Cache): Promise<void>;
  initializeFilesCache(): Promise<void>;
  validateCacheIntegrity(): Promise<void>;
}
```

# src/@/utils/tool-response-utils.d.ts

```ts
import { AgentState } from "../workflows/chat-langchain";
import { ToolResponseMetadata } from "@/types/workflow";
import { AIMessage } from "@langchain/core/messages";
export declare const extractToolResponseMetadata: (
  response: AIMessage,
  currentState: AgentState,
) => ToolResponseMetadata;
export declare const updateToolCallsWithCodeFlag: (
  toolCalls: Array<any>,
  returnModifiedCode: boolean,
) => Array<any>;
export declare const handleMissingCodeResponse: (
  hash: string,
  state: AgentState,
) => Promise<string | undefined>;
```

# src/@/workers/ast-langchain-workflow.worker.d.ts

```ts
import { createAstWorkflow } from "@/workflows/ast-code-workflow";
export { createAstWorkflow };
```

# src/@/workers/ata.worker.d.ts

```ts
interface ExtraLib {
  filePath: string;
  content: string;
}
export declare const myATA: (code: string) => Promise<ExtraLib[]>;
export declare function ata({ code, originToUse }: {
  code: string;
  originToUse: string;
}): Promise<ExtraLib[]>;
export {};
```

# src/@/workers/chat-utils-langchain.worker.d.ts

```ts
import { createWorkflowWithStringReplace } from "@/workflows/chat-langchain-workflow";
export { createWorkflowWithStringReplace };
```

# src/@/workers/chat-utils.worker.d.ts

```ts
import type { HandleSendMessageProps, ImageData, Message } from "@/lib/interfaces";
export declare class ChatHandler {
  private mod;
  private mutex;
  BC: BroadcastChannel;
  private lastCode;
  messages: Message[];
  private codeSpace;
  private code;
  private aiHandler;
  private setIsStreaming;
  private setMessages;
  constructor({ messages, codeSpace, code }: {
    messages: Message[];
    codeSpace: string;
    code: string;
  });
  handleMessage({ prompt, images }: {
    prompt: string;
    images: ImageData[];
  }): Promise<void>;
  private onUpdate;
  private getLastActionInfo;
  static createNewMessage(images: ImageData[], claudeContent: string): Promise<Message>;
  private processMessage;
  private updateModActions;
  private updateCode;
  private sendAssistantMessage;
  private extractTextContent;
  static updateSearchReplace({ instructions, code }: {
    instructions: string;
    code: string;
  }): Promise<{
    result: string;
    len: number;
    error: string;
  }>;
}
export declare const createNewMessage: typeof ChatHandler.createNewMessage;
export declare const updateSearchReplace: typeof ChatHandler.updateSearchReplace;
export declare function handleSendMessage(
  { messages, codeSpace, prompt, images, code }: HandleSendMessageProps,
): Promise<(string | Message)[]>;
```

# src/@/workers/dts.worker.d.ts

```ts
export {};
```

# src/@/workers/framer-motion.d.ts

```ts
export * from "framer-motion";
```

# src/@/workers/monaco-editor.worker.d.ts

```ts
export { editor, languages, Uri } from "monaco-editor";
```

# src/@/workers/prettier-esm.worker.d.ts

```ts
import { prettierCss, prettierJs } from "@/lib/prettier";
export type { prettierCss, prettierJs };
```

# src/@/workers/render-app.worker.d.ts

```ts
import { renderApp } from "@/lib/render-app";
export { renderApp };
```

# src/@/workers/shared-worker-rpc-handler.worker.d.ts

```ts
export {};
```

# src/@/workers/socket.worker.d.ts

```ts
import type { ICodeSession } from "@/lib/interfaces";
export declare function setConnections(signal: string, sess: ICodeSession): Promise<void>;
```

# src/@/workers/transpile.worker.d.ts

```ts
export {};
```

# src/@/workers/tw-merge.worker.d.ts

```ts
import { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export declare function cn(...inputs: ClassValue[]): string;
export type ClassNameMerger = typeof cn;
export default twMerge;
```

# src/@/workers/tw.worker.d.ts

```ts
import "@tailwindcss/browser";
```

# src/@/workflows/ast-code-workflow.d.ts

```ts
import { AgentState } from "../workflows/chat-langchain";
export declare const createAstWorkflow: (initialState: AgentState) => {
  invoke: (
    prompt: string,
    filePath: string,
  ) => Promise<
    import("@langchain/langgraph/web").StateType<import("@langchain/langgraph/web").StateDefinition>
  >;
};
```

# src/@/workflows/chat-langchain-workflow.d.ts

```ts
import { AgentState } from "../workflows/chat-langchain";
export declare const createWorkflowWithStringReplace: (initialState: AgentState) => {
  invoke: (prompt: string) => Promise<import("@langchain/langgraph/web").StateType<any>>;
};
```

# src/App.d.ts

```ts
export declare function App(): import("@emotion/react/jsx-runtime").JSX.Element;
```

# src/AppToRender.d.ts

```ts
import type { ICode } from "@/lib/interfaces";
import type { FC } from "react";
interface AppToRenderProps {
  codeSpace: string;
  cSess: ICode;
}
export declare const Hello: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const AppToRender: FC<AppToRenderProps>;
export {};
```

# src/ast-code-workflow-example.d.ts

```ts
import { ICode } from "@/lib/interfaces";
export declare const setupAndRunAst: (
  prompt: string,
  cSess: ICode,
) => Promise<
  import("@langchain/langgraph/web").StateType<import("@langchain/langgraph/web").StateDefinition>
>;
```

# src/AsyncStorage.d.ts

```ts
import {
  clear,
  getAllkeys,
  getItem,
  mergeItem,
  multiGet,
  multiMerge,
  multiRemove,
  multiSet,
  removeItem,
  setItem,
} from "window-async-local-storage";
export declare const getStore: () => Promise<Record<string, unknown>>;
export {
  clear,
  getAllkeys,
  getItem,
  mergeItem,
  multiGet,
  multiMerge,
  multiRemove,
  multiSet,
  removeItem,
  setItem,
};
export declare class AsyncLocalStorage {
  private currentStore;
  constructor();
  getItem: typeof getItem;
  setItem: typeof setItem;
  removeItem: typeof removeItem;
  clear: typeof clear;
  getStore: () => Record<string, unknown>;
  run(
    store: Record<string, unknown>,
    callback: (...args: unknown[]) => unknown,
    ...args: unknown[]
  ): unknown;
  getStoreSync(): Record<string, unknown>;
}
export default AsyncLocalStorage;
```

# src/browserify/perf_hooks.d.ts

```ts
declare function timerify<T>(fn: T): T;
declare function measure(name: string, startMark: string, endMark: string): PerformanceMeasure;
export declare const performance: {
  clearMarks: {
    (markName?: string): void;
    (markName?: string): void;
    (markName?: string): void;
  };
  mark: {
    (markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
    (markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
    (markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
  };
  measure: typeof measure;
  now: {
    (): DOMHighResTimeStamp;
    (): DOMHighResTimeStamp;
    (): DOMHighResTimeStamp;
  };
  nodeTiming: {};
  timeOrigin: number;
  timerify: typeof timerify;
};
export declare const PerformanceObserver: {
  new(callback: PerformanceObserverCallback): PerformanceObserver;
  prototype: PerformanceObserver;
  readonly supportedEntryTypes: ReadonlyArray<string>;
};
export {};
```

# src/chat-utils-langchain-example.d.ts

```ts
import { ICode } from "@/lib/interfaces";
export declare const setupAndRun: (prompt: string, cSess: ICode, options?: {
  returnModifiedCode: boolean;
}) => Promise<import("@langchain/langgraph/web").StateType<any>>;
```

# src/ChatInterface.d.ts

```ts
import type { ICode } from "@/lib/interfaces";
import React from "react";
declare const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  codeSpace: string;
  onClose: () => void;
}>;
export { ChatInterface };
```

# src/codeHistoryUtils.d.ts

```ts
export interface Version {
  timestamp: number;
  code: string;
}
export declare const loadVersionHistory: (codeSpace: string) => Promise<Version[]>;
export declare const saveVersionHistory: (codeSpace: string, versions: Version[]) => void;
export declare const addVersion: (
  codeSpace: string,
  newVersion: Version,
  currentVersions: Version[],
) => Version[];
```

# src/components/ActionButtons.d.ts

```ts
import type { FC } from "react";
interface ActionButtonsProps {
  codeSpace: string;
  handleDownload: () => void;
}
export declare const ActionButtons: FC<ActionButtonsProps>;
export {};
```

# src/components/AutoSaveHistory.d.ts

```ts
import type { ICode } from "@/lib/interfaces";
import type { IHistoryItem } from "@/lib/interfaces";
import React from "react";
interface CodeHistoryCarouselProps {
  codeSpace: string;
  onRestore: (item: IHistoryItem) => void;
  onClose: () => void;
  cSess: ICode;
}
export declare const CodeHistoryCarousel: React.FC<CodeHistoryCarouselProps>;
export default CodeHistoryCarousel;
```

# src/components/BreakpointButtons.d.ts

```ts
interface BreakpointButtonsProps {
  width: number;
  setWidth: (value: number) => void;
  breakPoints: number[];
}
export declare const BreakpointButtons: React.FC<BreakpointButtonsProps>;
export {};
```

# src/components/ContentWrapper.d.ts

```ts
export declare const ContentWrapper: (
  { children, scale, innerHeight, width, bgColor, rgba, type }: {
    children: React.ReactElement;
    scale: number;
    innerHeight: number;
    width: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
    type: string;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
```

# src/components/ContextViewer.d.ts

```ts
import React from "react";
interface ContextViewerProps {
  codeSpace: string;
}
export declare const ContextViewer: React.FC<ContextViewerProps>;
export {};
```

# src/components/DraggableWindowContent.d.ts

```ts
import { FC } from "react";
interface ColorUtils {
  bgColor: number[];
  rgba: (r: number, g: number, b: number, a: number) => string;
}
interface ScaleProps {
  scaleRange: number;
  setScaleRange: (scaleRange: number) => void;
  scale: number;
  sizes: number[];
  maxScaleRange: number;
}
interface DimensionProps {
  width: number;
  setWidth: (width: number) => void;
  breakPoints: number[];
  innerHeight: number;
}
interface ActionProps {
  codeSpace: string;
  handleDownload: () => void;
}
interface DraggableWindowContentProps extends ScaleProps, DimensionProps, ActionProps, ColorUtils {
  children: React.ReactElement;
}
export declare const DraggableWindowContent: FC<DraggableWindowContentProps>;
export type { ActionProps, ColorUtils, DimensionProps, DraggableWindowContentProps, ScaleProps };
```

# src/components/Editor.d.ts

```ts
import type { ICode } from "@/lib/interfaces";
import React from "react";
interface EditorProps {
  codeSpace: string;
  cSess: ICode;
}
export declare const Editor: React.FC<EditorProps>;
export {};
```

# src/components/editorUtils.d.ts

```ts
import type { ImageData } from "@/lib/interfaces";
import { RunMessageResult } from "src/services/websocket/types";
export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (code: string) => void;
}
type AnyFunction = (...args: any[]) => any;
type MemoizedFunctionWithAbort<T extends AnyFunction> = (
  ...args: [...Parameters<T>, AbortSignal]
) => ReturnType<T>;
export declare function memoizeWithAbort<T extends AnyFunction>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string,
): MemoizedFunctionWithAbort<T>;
export declare const formatCode: (code: string) => Promise<string>;
export declare const transpileCode: (code: string) => Promise<string>;
export declare const screenshot: () => Promise<ImageData>;
export declare const runCode: (transpiled: string) => Promise<RunMessageResult | false>;
export interface EditorInitOptions {
  container: HTMLDivElement;
  codeSpace: string;
  code: string;
  onChange: (newCode: string) => void;
}
export interface EditorInstance {
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (_newCode: string) => void;
}
export declare function initializeMonaco(options: EditorInitOptions): Promise<EditorInstance>;
export {};
```

# src/components/ErrorMessages.d.ts

```ts
export declare const errorMessages: {
  typescript: string;
  prettier: string;
  transpile: string;
  render: string;
};
export type ErrorType = keyof typeof errorMessages | null;
```

# src/components/ErrorReminder.d.ts

```ts
import React from "react";
import type { ErrorType } from "./ErrorMessages";
export declare const EditorNode: React.FC<{
  engine: "monaco" | "ace";
  errorType: ErrorType;
  containerRef: React.Ref<HTMLDivElement>;
  codeSpace: string;
}>;
interface ErrorReminderProps {
  errorType: ErrorType;
  onHeightChange: (height: number) => void;
  codeSpace: string;
}
export declare const ErrorReminder: React.FC<ErrorReminderProps>;
export {};
```

# src/components/History/HistoryFComponents.d.ts

```ts
import type { HistoryItemProps, ICode, IHistoryItem } from "@/lib/interfaces";
import React from "react";
declare const HistoryItem: React.FC<HistoryItemProps>;
declare const RestoreStatusAlert: ({ status }: {
  status: {
    type: string;
    message: string;
  };
}) => import("@emotion/react/jsx-runtime").JSX.Element;
declare const FullScreenHistoryView: React.FC<{
  history: IHistoryItem[];
  onRestore: (item: IHistoryItem) => void;
  onClose: () => void;
  onDelete: (timestamp: number) => void;
  cSess: ICode;
}>;
export { FullScreenHistoryView, HistoryItem, RestoreStatusAlert };
```

# src/components/icons.d.ts

```ts
export declare const QrCodeIcon: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Phone: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Share: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Tablet: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const Tv: () => import("@emotion/react/jsx-runtime").JSX.Element;
```

# src/components/KeyboardAwareComponent.d.ts

```ts
import type { FC } from "react";
declare const KeyboardAwareComponent: FC<{
  children: React.ReactNode;
}>;
export default KeyboardAwareComponent;
```

# src/components/MotionContainer.d.ts

```ts
export declare const MotionContainer: ({ children, bottom, right, bgColor, isChatOpen }: {
  children: React.ReactElement;
  bottom: number;
  right: number;
  bgColor: number[];
  isChatOpen: boolean;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
```

# src/components/Qr.d.ts

```ts
import type { FC } from "react";
export declare const QRButton: FC<{
  url: string;
}>;
export default QRButton;
```

# src/components/Qr.lazy.d.ts

```ts
import type { FC } from "react";
export declare const QRButton: FC<{
  url: string;
}>;
```

# src/components/Rainbow.d.ts

```ts
import type { FC, ReactNode } from "react";
export declare const RainbowWrapper: FC<{
  children: ReactNode;
}>;
```

# src/components/ScaledContent.d.ts

```ts
export declare const ScaledContent: ({ children, innerHeight, width, scale, bgColor, rgba }: {
  children: React.ReactElement;
  innerHeight: number;
  width: number;
  scale: number;
  bgColor: number[];
  rgba: (r: number, g: number, b: number, a: number) => string;
}) => React.ReactElement;
```

# src/components/ScaleRangeButtons.d.ts

```ts
interface ScaleRangeButtonsProps {
  scaleRange: number;
  setScaleRange: (value: number) => void;
  sizes: number[];
  maxScaleRange: number;
}
export declare const ScaleRangeButtons: React.FC<ScaleRangeButtonsProps>;
export {};
```

# src/config/cSessMock.d.ts

```ts
import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
declare class SessMock implements ICode {
  codeSpace: string;
  private subs;
  private session;
  getSession: () => Promise<ICodeSession>;
  getCodeSpace(): string;
  setSession: (sess: ICodeSession) => Promise<void>;
  init: () => Promise<ICodeSession>;
  sub(fn: (sess: ICodeSession) => void): () => void;
  addMessageChunk(chunk: string): void;
  setMessages(messages: Message[]): boolean;
  broadCastSessChanged(): void;
  setCode(rawCode: string): Promise<string>;
  screenshot(): Promise<ImageData>;
  getCode(): Promise<string>;
  getMessages: () => Message[];
}
export declare const cSessMock: SessMock;
export {};
```

# src/config/routes.d.ts

```ts
export declare const ROUTES: {
  readonly LIVE: (codeSpace: string) => string;
  readonly LIVE_CMS: (codeSpace: string) => string;
  readonly DEHYDRATED: (codeSpace: string) => string;
};
export interface RouteParams {
  codeSpace: string;
}
export declare const RouteUtils: {
  readonly isLiveRoute: (pathname: string) => boolean;
  readonly isLiveCMSRoute: (pathname: string) => boolean;
  readonly isDehydratedRoute: (pathname: string) => boolean;
  readonly shouldRenderApp: (pathname: string) => boolean;
};
```

# src/css.d.ts

```ts
import type { AnyNode, ChildNode, Rule } from "postcss";
import type Root_ from "postcss/lib/root";
export declare function parseStylesheet(stylesheet: string): Root_;
interface SerializeStylesheetOptions {
  compress?: boolean;
}
export declare function serializeStylesheet(
  ast: AnyNode,
  options: SerializeStylesheetOptions,
): string;
type SingleIterator<T> = (item: T) => boolean | void;
export declare function markOnly(
  predicate: SingleIterator<ChildNode | Root_>,
): (rule: Rule | ChildNode | Root_) => void;
export declare function applyMarkedSelectors(rule: Rule): void;
export declare function walkStyleRules(
  node: ChildNode | Root_,
  iterator: SingleIterator<ChildNode | Root_ | Rule>,
): void;
export declare function walkStyleRulesWithReverseMirror(
  node: Rule | Root_,
  node2: Rule | Root_ | undefined | null,
  iterator: SingleIterator<ChildNode | Root_>,
): void;
type SplitIterator<T> = (item: T, index: number, a: T[], b?: T[]) => boolean;
declare function filterSelectors(this: Rule, predicate: SplitIterator<string>): void;
declare module "postcss" {
  interface Node {
    _other?: Rule;
    $$remove?: boolean;
    $$markedSelectors?: string[];
    filterSelectors?: typeof filterSelectors;
  }
}
export {};
```

# src/DraggableWindow.d.ts

```ts
import { FC } from "react";
interface DraggableWindowProps {
  children: React.ReactElement;
  codeSpace: string;
  isChatOpen: boolean;
  initialDelay?: number;
  initialScale?: number;
}
export declare const DraggableWindow: FC<DraggableWindowProps>;
export {};
```

# src/emotion.d.ts

```ts
import { jsx } from "@emotion/react";
import { Fragment } from "react";
import { jsxs } from "react/jsx-runtime";
export * from "@emotion/react";
export { Fragment, jsx, jsxs };
```

# src/emotionCache.d.ts

```ts
import type { EmotionCache } from "@emotion/cache";
export type { EmotionCache };
declare const cache: (options: import("@emotion/cache").Options) => EmotionCache;
export default cache;
```

# src/emotionJsxRuntime.d.ts

```ts
export { jsxDEV } from "@emotion/react/jsx-dev-runtime";
import * as Jsx from "react/jsx-runtime";
declare const JSX: {
  Fragment: import("react").ExoticComponent<{
    children?: import("react").ReactNode;
  }>;
  jsx: typeof Jsx.jsx;
  jsxs: typeof Jsx.jsxs;
};
export default JSX;
export declare const jsx: typeof Jsx.jsx,
  jsxs: typeof Jsx.jsxs,
  Fragment: import("react").ExoticComponent<{
    children?: import("react").ReactNode;
  }>;
```

# src/emotionStyled.d.ts

```ts
import emotionStyled from "@emotion/styled";
export * from "@emotion/styled";
export default emotionStyled;
```

# src/enhancedFetch.d.ts

```ts
export declare const serverFetchUrl = "/api/server-fetch";
export declare const enhancedFetch: (
  url: RequestInfo | URL,
  options?: RequestInit,
) => Promise<Response>;
```

# src/esbuildWASM.d.ts

```ts
import wasmUrl from "esbuild-wasm/esbuild.wasm";
export { wasmUrl as wasmFile };
```

# src/hooks/autoSave.d.ts

```ts
interface AutoSaveOptions {
  key: string;
  data: unknown;
  debounceMs?: number;
}
export declare const useAutoSave: ({ key, data, debounceMs }: AutoSaveOptions) => {
  saveData: () => Promise<void>;
};
export {};
```

# src/hooks/processCSS.d.ts

```ts
declare function processCSS(css: string, baseURL: string, depth?: number): Promise<string>;
export default processCSS;
```

# src/hooks/use-editor-state.d.ts

```ts
import type { EditorState } from "../components/editorUtils";
import type { ErrorType } from "../components/ErrorMessages";
export declare const useEditorState: () => {
  containerRef: import("react").RefObject<HTMLDivElement | null>;
  engine: string;
  editorState: EditorState;
  setEditorState: (updater: EditorState | ((prev: EditorState) => EditorState)) => void;
};
export declare const useErrorHandling: () => {
  error: ErrorType;
  handleError: (errorType: ErrorType, errorMessage: string) => void;
  clearError: () => void;
};
```

# src/hooks/useAutoSave.d.ts

```ts
export declare const useAutoSave: (codeSpace: string) => Promise<Response>;
```

# src/hooks/useBgColor.d.ts

```ts
export declare const useBgColor: () => {
  bgColor: [number, number, number, number];
  setBgColor: import("react").Dispatch<
    import("react").SetStateAction<[number, number, number, number]>
  >;
  rgba: (r: number, g: number, b: number, a: number) => string;
};
```

# src/hooks/useClerkSWR.d.ts

```ts
export declare const useClerkSWR: (url: string) => import("swr").SWRResponse<any, any, any>;
```

# src/hooks/useCodeHistory.d.ts

```ts
interface HistoryItem {
  code: string;
  timestamp: number;
}
export declare const useCodeHistory: (codeSpace: string) => {
  history: HistoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};
export {};
```

# src/hooks/useContext.d.ts

```ts
import type { ProjectContext } from "@/lib/context-manager";
interface ContextHook {
  getContext: (key: string) => string;
  updateContext: (key: string, content: string) => void;
  getFullContext: () => ProjectContext;
  clearContext: () => void;
}
export declare function useContext(codeSpace: string): ContextHook;
export {};
```

# src/hooks/useDownload.d.ts

```ts
export declare const useDownload: (
  codeSpace: string,
  onlyReturn?: boolean,
) => () => Promise<string | void>;
```

# src/hooks/useErrorEffect.d.ts

```ts
import type { ContextManager } from "@/lib/context-manager";
import type { ErrorType } from "../components/ErrorMessages";
export declare const useErrorEffect: (
  errorType: ErrorType | null,
  codeSpace: string,
  contextManager: ContextManager,
  setShowError: (show: boolean) => void,
) => void;
```

# src/hooks/useErrorHandling.d.ts

```ts
export declare const useErrorHandling: (engine: string) => {
  errorType: "render" | "prettier" | "transpile" | "typescript" | null;
  setErrorType: import("react").Dispatch<
    import("react").SetStateAction<"render" | "prettier" | "transpile" | "typescript" | null>
  >;
  throttledTypeCheck: () => Promise<void>;
};
```

# src/hooks/useMediaQuery.d.ts

```ts
export declare const useMediaQuery: (query: string) => boolean;
```

# src/hooks/useRestoreVersion.d.ts

```ts
interface RestoreStatus {
  type: "loading" | "success" | "error";
  message: string;
}
export declare const useRestoreVersion: (codeSpace: string) => {
  restoreStatus: RestoreStatus | null;
  restoreVersion: (timestamp: number) => Promise<void>;
};
export {};
```

# src/hooks/useScreenshot.d.ts

```ts
export declare const useScreenshot: (codeSpace: string) => {
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => Promise<void>;
  handleCancelScreenshot: () => void;
};
```

# src/hooks/useWindowSize.d.ts

```ts
export declare const useWindowSize: () => {
  innerWidth: number;
  innerHeight: number;
};
```

# src/isMobile.d.ts

```ts
export declare function isMobile(): boolean;
```

# src/jsx.d.ts

```ts
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
export { Fragment, jsx, jsxs };
declare const JSX: {
  jsx: typeof jsx;
  jsxs: typeof jsxs;
  Fragment: import("react").ExoticComponent<{
    children?: import("react").ReactNode | undefined;
  }>;
};
export default JSX;
```

# src/lib/caching.d.ts

```ts
import { CodeAnalysis } from "@/workers/code-analysis.worker";
type CacheValue = string | CodeAnalysis | {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError: boolean;
  codeWasReturned: boolean;
};
interface CacheMetricsInterface {
  recordHit: () => void;
  recordMiss: () => void;
}
interface CacheStoreOptions {
  maxSize?: number;
  ttl?: number;
  name?: string;
  metrics?: CacheMetricsInterface;
}
export declare class CacheStore<T extends CacheValue> {
  private cache;
  private metrics;
  private name;
  constructor(options?: CacheStoreOptions);
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
  delete(key: string): void;
  clear(): void;
}
export declare const hashCache: CacheStore<string>;
export declare const codeAnalysisCache: CacheStore<CodeAnalysis>;
interface ToolResponse {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError: boolean;
  codeWasReturned: boolean;
}
export declare const toolResponseCache: CacheStore<ToolResponse>;
export declare function logCacheStats(): void;
export {};
```

# src/lib/metrics.d.ts

```ts
interface OperationMetrics {
  count: number;
  totalTime: number;
  avgTime: number;
  min: number;
  max: number;
  errors: number;
}
export declare class WorkflowMetrics {
  private static instance;
  private data;
  private constructor();
  static getInstance(): WorkflowMetrics;
  recordOperation(name: string, durationMs: number, isError?: boolean): void;
  getMetrics(name: string): OperationMetrics | null;
  getSummary(): Record<string, {
    operationCount: number;
    avgDurationMs: number;
    successRate: string;
    p95LatencyMs?: number;
  }>;
  getPerformanceReport(): string;
  reset(): void;
}
export declare const metrics: WorkflowMetrics;
export declare function measure(
  operationName: string,
): (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare class CacheMetrics {
  private hits;
  private misses;
  recordHit(): void;
  recordMiss(): void;
  getHitRate(): number;
  getStats(): {
    hits: number;
    misses: number;
    total: number;
    hitRate: string;
  };
  reset(): void;
}
export declare const hashCacheMetrics: CacheMetrics;
export declare const toolResponseCacheMetrics: CacheMetrics;
export declare const codeAnalysisCacheMetrics: CacheMetrics;
export {};
```

# src/lib/shared.d.ts

```ts
export declare const SHARED_CONSTANT = "shared-value";
export declare function sharedUtility(): string;
```

# src/lib/telemetry.d.ts

```ts
export interface TelemetryEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  measurements?: Record<string, number>;
  timestamp: Date;
}
export interface TelemetryOptions {
  enabled?: boolean;
  debug?: boolean;
  flushInterval?: number;
}
export declare class Telemetry {
  private static instance;
  private events;
  private timers;
  private options;
  private constructor();
  static getInstance(options?: TelemetryOptions): Telemetry;
  trackEvent(
    name: string,
    properties?: Record<string, string | number | boolean>,
    measurements?: Record<string, number>,
  ): void;
  startTimer(name: string): void;
  stopTimer(
    name: string,
    properties?: Record<string, string | number | boolean>,
  ): number | undefined;
  flush(): TelemetryEvent[];
  trackError(error: Error, properties?: Record<string, string | number | boolean>): void;
  trackProgress(
    stage: string,
    percent: number,
    details?: Record<string, string | number | boolean>,
  ): void;
  trackCodeModification(type: "create" | "update" | "delete", details: {
    filePath: string;
    linesChanged?: number;
    bytesChanged?: number;
  }): void;
  trackModelInteraction(details: {
    model: string;
    promptTokens: number;
    completionTokens: number;
    duration: number;
    success: boolean;
    error?: string;
  }): void;
  trackCacheOperation(
    operation: "hit" | "miss" | "set",
    cacheType: string,
    details?: Record<string, string | number | boolean>,
  ): void;
}
export declare const telemetry: Telemetry;
```

# src/memfs.d.ts

```ts
import memfs from "@/lib/memfs";
export * from "@/lib/memfs";
export default memfs;
```

# src/modules.d.ts

```ts
import { importMap, importMapReplace } from "@/lib/importmap-utils.ts";
export type {
  ImageData,
  IRenderApp,
  LanguageMap,
  Message,
  MessageContent,
  MessagePart,
  RenderedApp,
} from "@/lib/interfaces.ts";
import HTML from "./index.html";
export { HTML };
export { md5 } from "@/lib/md5.ts";
export { routes } from "@/lib/routes.ts";
export { serveWithCache } from "@/lib/serve-with-cache.ts";
export { importMapReplace };
export { serverFetchUrl } from "@/lib/enhanced-fetch";
import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess.ts";
export { fakeServer } from "./sw-local-fake-server";
import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/common-functions";
export { importMap };
export { computeSessionHash, generateSessionPatch, sessionToJSON };
export type { CodePatch, ICodeSession };
export { applySessionPatch, sanitizeSession };
```

# src/monaco-edi.d.ts

```ts
interface EditorConfig {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (code: string) => void;
}
interface EditorModel {
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (newCode: string) => void;
}
export declare const startMonaco: (
  { code, container, codeSpace, onChange }: EditorConfig,
) => Promise<EditorModel>;
export {};
```

# src/my-ata.d.ts

```ts
export declare const myATA: (code: string) => Promise<{
  filePath: string;
  content: string;
}[]>;
```

# src/reactDom.d.ts

```ts
import ReactDOM from "react-dom";
export declare const createPortal: typeof ReactDOM.createPortal,
  flushSync: typeof ReactDOM.flushSync,
  preconnect: typeof ReactDOM.preconnect,
  prefetchDNS: typeof ReactDOM.prefetchDNS,
  preinit: typeof ReactDOM.preinit,
  preinitModule: typeof ReactDOM.preinitModule,
  preload: typeof ReactDOM.preload,
  preloadModule: typeof ReactDOM.preloadModule,
  requestFormReset: typeof ReactDOM.requestFormReset,
  unstable_batchedUpdates: typeof ReactDOM.unstable_batchedUpdates,
  useFormState: typeof ReactDOM.useFormState,
  useFormStatus: typeof ReactDOM.useFormStatus,
  version: string;
export default ReactDOM;
```

# src/reactDomClient.d.ts

```ts
export { createRoot, hydrateRoot } from "react-dom/client";
```

# src/reactDomServer.d.ts

```ts
export { renderToString } from "react-dom/server";
```

# src/reactMod.d.ts

```ts
import React from "react";
export declare const Children: {
    map<T, C>(
      children: C | readonly C[],
      fn: (child: C, index: number) => T,
    ): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
    forEach<C>(children: C | readonly C[], fn: (child: C, index: number) => void): void;
    count(children: any): number;
    only<C>(children: C): C extends any[] ? never : C;
    toArray(
      children: React.ReactNode | React.ReactNode[],
    ): Array<Exclude<React.ReactNode, boolean | null | undefined>>;
  },
  Component: typeof React.Component,
  Fragment: React.ExoticComponent<{
    children?: React.ReactNode | undefined;
  }>,
  Profiler: React.ExoticComponent<React.ProfilerProps>,
  PureComponent: typeof React.PureComponent,
  StrictMode: React.ExoticComponent<{
    children?: React.ReactNode | undefined;
  }>,
  Suspense: React.ExoticComponent<React.SuspenseProps>,
  act: typeof React.act,
  cloneElement: typeof React.cloneElement,
  createContext: typeof React.createContext,
  createElement: typeof React.createElement,
  createRef: typeof React.createRef,
  forwardRef: typeof React.forwardRef,
  isValidElement: typeof React.isValidElement,
  lazy: typeof React.lazy,
  memo: typeof React.memo,
  startTransition: typeof React.startTransition,
  useCallback: typeof React.useCallback,
  useContext: typeof React.useContext,
  useDebugValue: typeof React.useDebugValue,
  useDeferredValue: typeof React.useDeferredValue,
  useEffect: typeof React.useEffect,
  useId: typeof React.useId,
  useImperativeHandle: typeof React.useImperativeHandle,
  useInsertionEffect: typeof React.useInsertionEffect,
  useLayoutEffect: typeof React.useLayoutEffect,
  useMemo: typeof React.useMemo,
  useReducer: typeof React.useReducer,
  useRef: typeof React.useRef,
  useState: typeof React.useState,
  useSyncExternalStore: typeof React.useSyncExternalStore,
  useTransition: typeof React.useTransition,
  cache: typeof React.cache,
  use: typeof React.use,
  useActionState: typeof React.useActionState,
  useOptimistic: typeof React.useOptimistic,
  version: string;
export default React;
```

# src/recharts.d.ts

```ts
export * from "recharts";
```

# src/routes/__root.d.ts

```ts
export default function App(): import("@emotion/react/jsx-runtime").JSX.Element;
```

# src/routes/**tests**/router.test.d.ts

```ts
export {};
```

# src/routes/router.d.ts

```ts
import { type RegisteredRouter, RouterProvider } from "@tanstack/react-router";
interface RouteWithPageParams {
  codeSpace: string;
  page: string;
}
interface RouteParams {
  codeSpace: string;
}
export declare const rootRoute: import("@tanstack/react-router").RootRoute<
  undefined,
  {},
  import("@tanstack/router-core").AnyContext,
  import("@tanstack/router-core").AnyContext,
  {},
  undefined,
  unknown,
  unknown
>;
export declare const router: import("@tanstack/react-router").Router<
  import("@tanstack/react-router").RootRoute<
    undefined,
    {},
    import("@tanstack/router-core").AnyContext,
    import("@tanstack/router-core").AnyContext,
    {},
    undefined,
    readonly (
      | import("@tanstack/react-router").Route<
        import("@tanstack/react-router").RootRoute<
          undefined,
          {},
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext,
          {},
          undefined,
          unknown,
          unknown
        >,
        "/live/$codeSpace/$page",
        "/live/$codeSpace/$page",
        string,
        "/live/$codeSpace/$page",
        undefined,
        RouteWithPageParams,
        import("@tanstack/router-core").AnyContext,
        import("@tanstack/router-core").AnyContext,
        import("@tanstack/router-core").AnyContext,
        {},
        ({
          params: { codeSpace },
        }: import("@tanstack/router-core").LoaderFnContext<
          import("@tanstack/react-router").RootRoute<
            undefined,
            {},
            import("@tanstack/router-core").AnyContext,
            import("@tanstack/router-core").AnyContext,
            {},
            undefined,
            unknown,
            unknown
          >,
          "/live/$codeSpace/$page",
          RouteWithPageParams,
          {},
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext
        >) => Promise<{
          codeSpace: string;
          page: string;
        }>,
        unknown,
        unknown
      >
      | import("@tanstack/react-router").Route<
        import("@tanstack/react-router").RootRoute<
          undefined,
          {},
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext,
          {},
          undefined,
          unknown,
          unknown
        >,
        "/live/$codeSpace",
        "/live/$codeSpace",
        string,
        "/live/$codeSpace",
        undefined,
        RouteParams,
        import("@tanstack/router-core").AnyContext,
        import("@tanstack/router-core").AnyContext,
        import("@tanstack/router-core").AnyContext,
        {},
        ({
          params: { codeSpace },
        }: import("@tanstack/router-core").LoaderFnContext<
          import("@tanstack/react-router").RootRoute<
            undefined,
            {},
            import("@tanstack/router-core").AnyContext,
            import("@tanstack/router-core").AnyContext,
            {},
            undefined,
            unknown,
            unknown
          >,
          "/live/$codeSpace",
          RouteParams,
          {},
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext,
          import("@tanstack/router-core").AnyContext
        >) => Promise<{
          codeSpace: string;
        }>,
        unknown,
        unknown
      >
    )[],
    unknown
  >,
  import("@tanstack/router-core").TrailingSlashOption,
  boolean,
  import("@tanstack/history").RouterHistory,
  Record<string, any>,
  Record<string, any>
>;
export interface RouterState {
  resolvedLocation: {
    pathname: string;
    params: RouteParams | RouteWithPageParams;
  };
}
export type AppRouter = typeof router;
export { RouterProvider };
interface RouterComponentProps {
  router: RegisteredRouter;
}
export declare const RouterComponent: React.FC<RouterComponentProps>;
export declare const AppRouter: React.FC;
```

# src/routeTree.gen.d.ts

```ts
import { Route as rootRoute } from "./routes/__root";
import { Route as testsRouterTestImport } from "./routes/__tests__/router.test";
import { Route as RouterImport } from "./routes/router";
declare const RouterRoute: any;
declare const testsRouterTestRoute: any;
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/router": {
      id: "/router";
      path: "/router";
      fullPath: "/router";
      preLoaderRoute: typeof RouterImport;
      parentRoute: typeof rootRoute;
    };
    "/__tests__/router/test": {
      id: "/__tests__/router/test";
      path: "/router/test";
      fullPath: "/router/test";
      preLoaderRoute: typeof testsRouterTestImport;
      parentRoute: typeof rootRoute;
    };
  }
}
export interface FileRoutesByFullPath {
  "/router": typeof RouterRoute;
  "/router/test": typeof testsRouterTestRoute;
}
export interface FileRoutesByTo {
  "/router": typeof RouterRoute;
  "/router/test": typeof testsRouterTestRoute;
}
export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/router": typeof RouterRoute;
  "/__tests__/router/test": typeof testsRouterTestRoute;
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/router" | "/router/test";
  fileRoutesByTo: FileRoutesByTo;
  to: "/router" | "/router/test";
  id: "__root__" | "/router" | "/__tests__/router/test";
  fileRoutesById: FileRoutesById;
}
export interface RootRouteChildren {
  RouterRoute: typeof RouterRoute;
  testsRouterTestRoute: typeof testsRouterTestRoute;
}
export declare const routeTree: any;
export {};
```

# src/sab.d.ts

```ts
export declare function sab2str(buf: SharedArrayBuffer): string;
export declare function str2sab(str: string): {
  array: Uint16Array<SharedArrayBuffer>;
  buffer: SharedArrayBuffer;
};
export declare function ab2str(buf: ArrayBuffer): string;
export declare function str2ab(str: string): ArrayBuffer;
```

# src/serve-with-cache.d.ts

```ts
export declare function serveWithCache(url: string): Promise<Response>;
```

# src/services/code/CodeProcessor.d.ts

```ts
import { ICodeSession } from "@/lib/interfaces";
import { RunMessageResult } from "../websocket/types";
export declare class CodeProcessor {
  private static renderService;
  constructor(codeSpace: string);
  process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
    getSession: () => ICodeSession,
  ): Promise<ICodeSession | false>;
  private formatCode;
  private transpileCode;
  runCode(transpiled: string): Promise<RunMessageResult>;
}
```

# src/services/code/ModelManager.d.ts

```ts
import { Code } from "../CodeSession";
import type { IModelManager } from "../interfaces/IModelManager";
export declare class ModelManager implements IModelManager {
  private models;
  private currentCodeSpace;
  constructor(codeSpace: string, initialModel: Code);
  getModel(codeSpace: string): Code | undefined;
  setModel(codeSpace: string, model: Code): void;
  updateModelsByCode(newCodes: string): Promise<string>;
  getCurrentCodeWithExtraModels(): Promise<string>;
  private fetchAndCreateExtraModels;
  private formatCodeAsSection;
  release(): Promise<void>;
}
```

# src/services/code/SessionManager.d.ts

```ts
import type { ICodeSession, Message } from "@/lib/interfaces";
import type { ISessionManager } from "../interfaces/ISessionManager";
export declare class SessionManager implements ISessionManager {
  private session;
  private user;
  private broadcastChannel;
  constructor(codeSpace: string);
  init(initialSession?: ICodeSession): Promise<ICodeSession>;
  addMessageChunk(chunk: string): void;
  setMessages(messages: Message[]): boolean;
  subscribe(callback: (session: ICodeSession) => void): () => void;
  getSession(): ICodeSession;
  updateSession(sessionData: Partial<ICodeSession>): void;
  private computeSessionDiff;
  private broadcastSession;
  release(): Promise<void>;
}
```

# src/services/CodeSession.d.ts

```ts
import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
export declare class Code implements ICode {
  private codeSpace;
  private modelManager;
  private codeProcessor;
  private releaseWorker;
  private setCodeController;
  private isRunning;
  private pendingRun;
  private session;
  private sessionManager;
  constructor(codeSpace: string);
  getSession(): Promise<ICodeSession>;
  setSession(session: ICodeSession): void;
  init(session?: ICodeSession | null): Promise<ICodeSession>;
  computeSessionHash(session: ICodeSession): string;
  getCodeSpace(): string;
  getMessages(): Message[];
  getCode(): Promise<string>;
  addMessageChunk(chunk: string): void;
  setMessages(messages: Message[]): boolean;
  setCode(rawCode: string, skipRunning?: boolean): Promise<string | boolean>;
  private updateCodeInternal;
  setModelsByCurrentCode(newCodes: string): Promise<string>;
  currentCodeWithExtraModels(): Promise<string>;
  sub(callback: (session: ICodeSession) => void): () => void;
  release(): Promise<void>;
  screenshot(): Promise<ImageData>;
  run(): Promise<void>;
}
```

# src/services/CodeSessionBc.d.ts

```ts
import { ICodeSession } from "src/modules";
import { ICodeSessionBC } from "./websocket/types";
export declare class CodeSessionBC implements ICodeSessionBC {
  private codeSpace;
  private broadcastChannel;
  session: ICodeSession | null;
  subscribers: Array<(session: ICodeSession) => void>;
  constructor(codeSpace: string, session?: ICodeSession);
  getCode(): Promise<string>;
  init(session?: ICodeSession): Promise<ICodeSession>;
  sub(callback: (session: ICodeSession) => void): () => void;
  postMessage(session: ICodeSession): void;
  close(): void;
}
```

# src/services/interfaces/ICodeProcessor.d.ts

```ts
import { RunMessageResult } from "../websocket/types";
export interface ICodeProcessor {
  process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
  ): Promise<RunMessageResult | false>;
  runCode(code: string): Promise<RunMessageResult>;
}
```

# src/services/interfaces/IModelManager.d.ts

```ts
import type { Code } from "../CodeSession";
export interface IModelManager {
  getModel(codeSpace: string): Code | undefined;
  setModel(codeSpace: string, model: Code): void;
  updateModelsByCode(newCodes: string): Promise<string>;
  getCurrentCodeWithExtraModels(): Promise<string>;
  release(): Promise<void>;
}
export type IExtraModelsResult = Record<string, string>;
```

# src/services/interfaces/ISessionManager.d.ts

```ts
import type { ICodeSession, Message } from "@/lib/interfaces";
export interface ISessionManager {
  init(initialSession?: ICodeSession): Promise<ICodeSession>;
  addMessageChunk(chunk: string): void;
  setMessages(messages: Message[]): boolean;
  subscribe(callback: (session: ICodeSession) => void): () => void;
  getSession(): ICodeSession;
  updateSession(sessionData: Partial<ICodeSession>): void;
  release(): Promise<void>;
}
```

# src/services/message/MessageHandlerService.d.ts

```ts
import type { Message, MessageHandlerConfig, MessageResponse } from "@/lib/interfaces";
export declare class MessageHandlerService {
  private config;
  constructor(config?: MessageHandlerConfig);
  validateMessage(message: unknown): message is Message;
  private isTextPart;
  private getTextFromContent;
  handleMessage(message: Message): Promise<MessageResponse>;
  private processMessage;
}
```

# src/services/message/types.d.ts

```ts
export {};
```

# src/services/render/RenderService.d.ts

```ts
import type { RenderedApp } from "@/lib/interfaces";
export declare class RenderService {
  private rendered;
  private renderedMd5;
  private readonly mutex;
  private readonly codeSpace;
  constructor(codeSpace: string);
  updateRenderedApp({ transpiled }: {
    transpiled: string;
  }): Promise<RenderedApp | null>;
  handleRender(renderedNew: RenderedApp | null): Promise<
    {
      css: string;
      html: string;
    } | false
  >;
  cleanup(): void;
  private htmlDecode;
}
```

# src/services/screenshot/ScreenshotService.d.ts

```ts
export declare class ScreenshotService {
  private readonly codeSpace;
  constructor(codeSpace: string);
  takeScreenshot(): Promise<void>;
  private canvasToBlob;
  private createScreenshotFile;
  private postScreenshotMessage;
}
```

# src/services/websocket/enums.d.ts

```ts
export declare enum WebSocketState {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  RECONNECTING = "reconnecting",
  ERROR = "error",
}
export declare enum WebSocketEventType {
  MESSAGE = "message",
  ERROR = "error",
  CLOSE = "close",
  OPEN = "open",
}
```

# src/services/websocket/types.d.ts

```ts
export interface MessageData {
  html: string;
  css: string;
  code?: string;
  transpiled?: string;
}
export interface RunMessageResult {
  html: string;
  css: string;
}
export interface WebSocketConfig {
  maxRetries?: number;
  retryDelay?: number;
  connectionTimeout?: number;
}
export interface WebSocketDependencies {
  messageHandler: IMessageHandlerService;
  serviceWorker: IServiceWorkerManager;
  codeSessionBC: ICodeSessionBC;
}
export interface IMessageHandlerService {
  handleMessage(event: Message): Promise<MessageResponse>;
  handleRunMessage(transpiled: string): Promise<RunMessageResult | false>;
  cleanup(): void;
}
export interface IServiceWorkerManager {
  setup(): Promise<ServiceWorker | undefined>;
}
export interface ICodeSessionBC {
  init(): Promise<ICodeSession>;
  sub(callback: (data: MessageData) => void): () => void;
}
export interface IWebSocketManager {
  init(): Promise<void>;
  handleRunMessage(transpiled: string): Promise<RunMessageResult | false>;
  cleanup(): void;
}
import { ICodeSession, Message, MessageResponse } from "@/lib/interfaces";
import { WebSocketEventType } from "./enums";
export type WebSocketEventHandler = (event: MessageEvent | Event) => void;
export interface WebSocketSubscription {
  type: WebSocketEventType;
  handler: WebSocketEventHandler;
  unsubscribe: () => void;
}
export { WebSocketEventType, WebSocketState } from "./enums";
```

# src/services/websocket/WebSocketManager.d.ts

```ts
import {
  IWebSocketManager,
  RunMessageResult,
  WebSocketConfig,
  WebSocketDependencies,
} from "./types";
export declare class WebSocketManager implements IWebSocketManager {
  private readonly codeSpace;
  private readonly dependencies;
  private readonly config;
  private state;
  private retryCount;
  private readonly subscriptions;
  constructor(dependencies: WebSocketDependencies, config?: WebSocketConfig);
  init(): Promise<void>;
  handleRunMessage(transpiled: string): Promise<RunMessageResult | false>;
  cleanup(): void;
  private initializeResources;
  private setupRouteHandlers;
  private handleLivePage;
  private handleDehydratedPage;
  private handleDefaultPage;
  private subscribe;
  private unsubscribeAll;
  private readonly handleError;
}
```

# src/services/worker/ServiceWorkerManager.d.ts

```ts
import { IServiceWorkerManager } from "../websocket/types";
export declare class ServiceWorkerManager implements IServiceWorkerManager {
  setup(): Promise<ServiceWorker | undefined>;
}
```

# src/setupTests.d.ts

```ts
import "@testing-library/jest-dom";
declare class MockWorker implements Worker {
  private _stringUrl;
  private options?;
  onmessage: ((event: MessageEvent) => void) | null;
  onmessageerror: ((event: MessageEvent) => void) | null;
  onerror: ((error: ErrorEvent) => void) | null;
  constructor(_stringUrl: string | URL, options?: WorkerOptions | undefined);
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string): void;
  postMessage(data: unknown): void;
  terminate(): void;
  dispatchEvent(): boolean;
}
declare class MockSharedWorker implements SharedWorker {
  private url;
  private options;
  port: MessagePort;
  onerror: ((event: ErrorEvent) => void) | null;
  constructor(stringUrl: string | URL, options?: string | WorkerOptions);
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, _listener: EventListener): void;
  dispatchEvent(_event: Event): boolean;
}
declare global {
  interface Window {
    Worker: typeof MockWorker;
    SharedWorker: typeof MockSharedWorker;
  }
}
interface NavigationAPI {
  navigate: (url: string) => Promise<void>;
  reload: () => Promise<void>;
  traverseTo: (key: string) => Promise<void>;
  back: () => Promise<void>;
  forward: () => Promise<void>;
}
declare global {
  interface Window {
    navigation: NavigationAPI;
  }
}
export {};
```

# src/start.d.ts

```ts
import "./index.css";
```

# src/sw-deps.d.ts

```ts
import { QueuedFetch } from "@/lib/queued-fetch";
import { serveWithCache } from "@/lib/serve-with-cache";
import { fakeServer } from "./sw-local-fake-server";
export type { fakeServer, QueuedFetch, serveWithCache };
```

# src/sw-local-fake-server.d.ts

```ts
export declare function fakeServer(request: Request): Promise<Response>;
```

# src/sw.d.ts

```ts
export {};
```

# src/swUtils.d.ts

```ts
export declare function deleteAllServiceWorkers(): Promise<void>;
export declare function runTests(swVersion: string): Promise<void>;
```

# src/swVersion.d.ts

```ts
export declare const swVersion = "localTests";
```

# src/transpile.d.ts

```ts
export { build, transpile, wasmFile } from "@/lib/transpile";
```

# src/types/langraph.d.ts

```ts
import { RunnableConfig } from "@langchain/core/runnables";
import { AgentState } from "./workflow-types";
interface IterableReadableStreamInterface<T> extends AsyncIterable<T> {
  getReader(): {
    read: () => Promise<{
      done: boolean;
      value: T | undefined;
    }>;
    releaseLock: () => void;
  };
}
export type NodeState = AgentState;
export type NodeUpdate = Partial<AgentState>;
export interface NodeConfig extends RunnableConfig {
  configurable: {
    thread_id: string;
  };
}
export interface WorkflowNode {
  invoke: (state: NodeState, config?: NodeConfig) => Promise<NodeUpdate>;
  lc_namespace: string[];
  lc_serializable: boolean;
  batch: (states: NodeState[]) => Promise<NodeUpdate[]>;
  stream: (
    input: NodeState,
    options?: Partial<NodeConfig>,
  ) => Promise<IterableReadableStreamInterface<NodeUpdate>>;
  transform: (input: AsyncGenerator<unknown>) => AsyncGenerator<NodeState>;
  getName(): string;
  lc_id: string[];
  getRuntimeEnvironment(): Record<string, unknown>;
}
export declare function createNode(
  name: string,
  processFunc: (state: NodeState) => Promise<NodeUpdate>,
): WorkflowNode;
export interface CompiledGraph {
  invoke: (state: NodeState, options?: Partial<NodeConfig>) => Promise<NodeState>;
}
export declare const createInitialState: () => NodeState;
export {};
```

# src/types/workflow-types.d.ts

```ts
import { AIMessage } from "@langchain/core/messages";
export interface AgentState {
  messages: AIMessage[];
  code?: string;
  origin: string;
  codeSpace: string;
  lastError?: string;
  hash?: string;
  filePath?: string;
  isStreaming?: boolean;
}
export type WorkflowContinueResult = "process" | "tools" | "end";
export type CompiledWorkflow = {
  invoke: (state: AgentState, config: {
    configurable: {
      thread_id: string;
    };
  }) => Promise<AgentState>;
};
export interface WorkflowHandler {
  processMessage: (state: AgentState) => Promise<Partial<AgentState>>;
  shouldContinue: (state: AgentState) => Promise<WorkflowContinueResult>;
}
export interface WorkflowChannels {
  messages: {
    reducer: (prev: AIMessage[], next: AIMessage[]) => AIMessage[];
  };
  codeSpace: {
    reducer: (prev: string, next: string) => string;
  };
  origin: {
    reducer: (prev: string, next: string) => string;
  };
  code: {
    reducer: (prev: string, next: unknown) => string;
  };
  lastError: {
    reducer: (prev: string, next: unknown) => string;
  };
  isStreaming: {
    reducer: (prev: boolean, next: boolean) => boolean;
  };
  hash: {
    reducer: (prev: string | undefined, next: string) => string;
  };
  filePath: {
    reducer: (prev: string | undefined, next: string | undefined) => string | undefined;
  };
}
```

# src/unpkg-path-plugin.d.ts

```ts
import type * as esbuild from "esbuild-wasm";
export declare const unpkgPathPlugin: (origin: string) => {
  name: string;
  setup(build: esbuild.PluginBuild): void;
};
```

# src/utils/code-analysis.d.ts

```ts
export interface CodeAnalysis {
  componentName: string | null;
  hooks: string[];
  props: string[];
  imports: string[];
  state: {
    variables: string[];
    setters: string[];
  };
  styling: {
    type: "css" | "tailwind" | "styled-components" | "emotion" | "inline" | "unknown";
    classes: string[];
  };
  functions: {
    name: string;
    params: string[];
    isAsync: boolean;
  }[];
}
export declare function analyzeReactCode(code: string): CodeAnalysis;
export declare function generateSemanticDiff(originalCode: string, modifiedCode: string): {
  componentRenamed: boolean;
  addedHooks: string[];
  removedHooks: string[];
  addedProps: string[];
  removedProps: string[];
  addedImports: string[];
  removedImports: string[];
  stateChanges: {
    added: string[];
    removed: string[];
  };
  stylingChanges: {
    typeChanged: boolean;
    addedClasses: string[];
    removedClasses: string[];
  };
};
export declare function verifySemanticIntegrity(originalCode: string, modifiedCode: string): {
  valid: boolean;
  reason?: string;
};
```

# src/utils/contextUtils.d.ts

```ts
export declare function extractCurrentTask(aiResponse: string): string;
export declare function extractCodeStructure(code: string): string;
```

# src/utils/extractArtifacts.d.ts

```ts
interface Artifact {
  identifier: string;
  type: string;
  language: string;
  title: string;
  content: string;
}
export declare const extractArtifacts: (content: string) => Artifact[];
export {};
```

# src/utils/getParts.d.ts

```ts
export {};
```

# src/utils/mineCss.d.ts

```ts
import type { EmotionCache } from "@emotion/cache";
declare function mineFromCaches(cache: EmotionCache): string[];
export { mineFromCaches };
```

# src/utils/retry.d.ts

```ts
export declare const RETRYABLE_ERRORS: readonly [
  "ECONNRESET",
  "ETIMEDOUT",
  "ECONNABORTED",
  "RATE_LIMIT_EXCEEDED",
  "429",
  "500",
  "503",
];
export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  retryableErrors?: string[];
  onRetry?: (attempt: number, error: Error, nextDelay: number) => void;
}
export declare function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
export declare function isRetryableError(error: unknown): boolean;
```

# src/utils/types.d.ts

```ts
export type LanguageMap = Record<string, string>;
```

# src/utils/versionHistoryUtils.d.ts

```ts
export {};
```

# src/ws.d.ts

```ts
import type { IWebSocketManager } from "./services/websocket/types";
import { WebSocketManager } from "./services/websocket/WebSocketManager";
export declare const main: (codeSpace: string) => Promise<WebSocketManager>;
export declare const testHandleRunMessage: (
  transpiled: string,
  webSocketManager: IWebSocketManager,
) => Promise<false | import("./services/websocket/types").RunMessageResult>;
```

# vite.config.d.ts

```ts
declare const _default: import("vite").UserConfigFnObject;
export default _default;
```

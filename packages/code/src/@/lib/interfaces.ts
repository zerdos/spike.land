import type { EmotionCache } from "@emotion/cache";
import type { Root } from "react-dom/client";

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
  transpiled: string;
};

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

export interface Message {
  id: string;
  role: "user" | "system" | "system";
  content: MessageContent;
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

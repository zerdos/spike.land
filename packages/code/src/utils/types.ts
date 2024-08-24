export interface LanguageMap {
  [key: string]: string;
}

export interface MessagePart {
  type: "text" | "code";
  content: string;
  language?: string;
  isStreaming?: boolean;
}

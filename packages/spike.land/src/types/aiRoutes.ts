import type { Message } from "@spike-npm-land/code";

export interface MessageContentPart {
  type: string;
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface PostRequestBody {
  messages: Message[];
  runConfig?: Record<string, unknown>;
  state?: unknown;
  tools?: Record<string, unknown>;
  unstable_assistantMessageId?: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export const DEFAULT_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=UTF-8",
};

export const PREFLIGHT_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
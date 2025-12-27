import { type MockInstance } from "vitest";

// Type definitions for OpenAI mock API
interface OpenAISpeechParams {
  model?: string;
  input?: string;
  voice?: string;
  response_format?: string;
}

interface OpenAITranscriptionParams {
  file?: Blob | ArrayBuffer;
  model?: string;
  language?: string;
}

interface OpenAIChatCompletionParams {
  model?: string;
  messages?: Array<{ role: string; content: string; }>;
  stream?: boolean;
  temperature?: number;
}

interface OpenAISpeechResponse {
  arrayBuffer: () => Promise<ArrayBuffer>;
}

interface OpenAITranscriptionResponse {
  text: string;
}

interface OpenAIChatCompletionResponse {
  choices: Array<{ message: { content: string; }; }>;
}

interface OpenAIClient {
  audio: {
    speech: { create(params: OpenAISpeechParams): Promise<OpenAISpeechResponse>; };
    transcriptions: { create(params: OpenAITranscriptionParams): Promise<OpenAITranscriptionResponse>; };
  };
  chat: { completions: { create(params: OpenAIChatCompletionParams): Promise<OpenAIChatCompletionResponse>; }; };
}

interface CodeRateLimiterInterface {
  check: (key: string) => Promise<boolean>;
  reset: (key: string) => void;
}

declare global {
  var OpenAI: {
    new(): OpenAIClient;
  };
  var openai: OpenAIClient;
  var CodeRateLimiter: CodeRateLimiterInterface;
  var R2: {
    put: MockInstance;
    get: MockInstance;
    list: MockInstance;
    delete: MockInstance;
  };
}

export {}; // This file is only for type declarations

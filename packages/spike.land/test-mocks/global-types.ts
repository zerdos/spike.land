import { type MockInstance } from "vitest";

declare global {
  var OpenAI: {
    new(): {
      audio: {
        speech: { create(params: Record<string, unknown>): Promise<unknown>; };
        transcriptions: { create(params: Record<string, unknown>): Promise<unknown>; };
      };
      chat: { completions: { create(params: Record<string, unknown>): Promise<unknown>; }; };
    };
  };
  var openai: {
    audio: {
      speech: { create(params: Record<string, unknown>): Promise<unknown>; };
      transcriptions: { create(params: Record<string, unknown>): Promise<unknown>; };
    };
    chat: { completions: { create(params: Record<string, unknown>): Promise<unknown>; }; };
  };
  var CodeRateLimiter: unknown;
  var R2: {
    put: MockInstance;
    get: MockInstance;
    list: MockInstance;
    delete: MockInstance;
  };
}

export {}; // This file is only for type declarations

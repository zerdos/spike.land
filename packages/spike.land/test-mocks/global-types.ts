import { type MockInstance } from "vitest";

declare global {
  var OpenAI: {
    new(): {
      audio: {
        speech: { create(params: any): Promise<any>; };
        transcriptions: { create(params: any): Promise<any>; };
      };
      chat: { completions: { create(params: any): Promise<any>; }; };
    };
  };
  var openai: {
    audio: {
      speech: { create(params: any): Promise<any>; };
      transcriptions: { create(params: any): Promise<any>; };
    };
    chat: { completions: { create(params: any): Promise<any>; }; };
  };
  var CodeRateLimiter: any;
  var R2: {
    put: MockInstance;
    get: MockInstance;
    list: MockInstance;
    delete: MockInstance;
  };
}

export {}; // This file is only for type declarations

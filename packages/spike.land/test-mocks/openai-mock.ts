import { vi } from "vitest";

interface OpenAIParams {
  model?: string;
  stream?: boolean;
  error?: boolean;
  [key: string]: unknown;
}

export function setupOpenAIMock() {
  global.OpenAI = class {
    public audio: {
      speech: { create: ReturnType<typeof vi.fn>; };
      transcriptions: { create: ReturnType<typeof vi.fn>; };
    };
    public chat: {
      completions: { create: ReturnType<typeof vi.fn>; };
    };
    constructor() {
      this.audio = {
        speech: {
          create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
            if (params.model === "tts-1" || params.model === "tts-1-hd") {
              return {
                status: 200,
                headers: { get: () => "audio/mpeg" },
                arrayBuffer: async () => new ArrayBuffer(0),
              };
            }
            throw new Error("TTS error");
          }),
        },
        transcriptions: {
          create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
            if (params.error) {
              throw new Error("Transcription error");
            }
            return { text: "Test transcription" };
          }),
        },
      };

      this.chat = {
        completions: {
          create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
            if (params.stream) {
              return {
                [Symbol.asyncIterator]: async function*() {
                  yield {
                    choices: [
                      { delta: { content: "Test streaming response" } },
                    ],
                  };
                },
              };
            }
            return {
              id: "test-id",
              choices: [{ message: { content: "Test chat response" } }],
            };
          }),
        },
      };
    }
  };

  // Create a global instance
  global.openai = {
    audio: {
      speech: {
        create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
          if (params.model === "tts-1" || params.model === "tts-1-hd") {
            return {
              status: 200,
              headers: { get: () => "audio/mpeg" },
              arrayBuffer: async () => new ArrayBuffer(0),
            };
          }
          throw new Error("TTS error");
        }),
      },
      transcriptions: {
        create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
          if (params.error) {
            throw new Error("Transcription error");
          }
          return { text: "Test transcription" };
        }),
      },
    },
    chat: {
      completions: {
        create: vi.fn().mockImplementation(async (params: OpenAIParams) => {
          if (params.stream) {
            return {
              [Symbol.asyncIterator]: async function*() {
                yield {
                  choices: [
                    { delta: { content: "Test streaming response" } },
                  ],
                };
              },
            };
          }
          return {
            id: "test-id",
            choices: [{ message: { content: "Test chat response" } }],
          };
        }),
      },
    },
  };
}

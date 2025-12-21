import { vi } from "vitest";

export function setupOpenAIMock() {
  global.OpenAI = class {
    public audio: any;
    public chat: any;
    constructor() {
      this.audio = {
        speech: {
          create: vi.fn().mockImplementation(async (params: any) => {
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
          create: vi.fn().mockImplementation(async (params: any) => {
            if (params.error) {
              throw new Error("Transcription error");
            }
            return { text: "Test transcription" };
          }),
        },
      };

      this.chat = {
        completions: {
          create: vi.fn().mockImplementation(async (params: any) => {
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
        create: vi.fn().mockImplementation(async (params: any) => {
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
        create: vi.fn().mockImplementation(async (params: any) => {
          if (params.error) {
            throw new Error("Transcription error");
          }
          return { text: "Test transcription" };
        }),
      },
    },
    chat: {
      completions: {
        create: vi.fn().mockImplementation(async (params: any) => {
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

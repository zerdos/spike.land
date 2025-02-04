import OpenAI from "openai";
import { beforeEach, describe, expect, it } from "vitest";
import { type Mock, vi } from "vitest";
import type Env from "./env";
import { handleGPT4Request } from "./openaiHandler";
import { readRequestBody } from "./utils";

// Mock OpenAI class
vi.mock("openai", () => {
  const OpenAIMock = vi.fn();
  OpenAIMock.prototype.audio = {
    speech: {
      create: vi.fn().mockResolvedValue({
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
      }),
    },
    transcriptions: {
      create: vi.fn().mockResolvedValue("Transcribed text"),
    },
  };
  OpenAIMock.prototype.chat = {
    completions: {
      create: vi.fn().mockResolvedValue({
        [Symbol.asyncIterator]: () => ({
          next: vi.fn()
            .mockResolvedValueOnce({
              value: { choices: [{ delta: { content: "Hello " } }] },
              done: false,
            })
            .mockResolvedValueOnce({
              value: { choices: [{ delta: { content: "world" } }] },
              done: false,
            })
            .mockResolvedValueOnce({ done: true }),
        }),
      }),
    },
  };
  return { default: OpenAIMock };
});

vi.mock("./Logs", () => ({
  KVLogger: vi.fn().mockImplementation(() => ({
    log: vi.fn(),
  })),
}));

vi.mock("./utils", () => ({
  handleCORS: vi.fn(),
  readRequestBody: vi.fn(),
}));

describe("OpenAIHandler", () => {
  let mockEnv: Partial<Env>;
  let mockCtx: ExecutionContext;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    mockEnv = {
      OPENAI_API_KEY: "test-api-key",
      KV: {},
    } as Env;

    mockCtx = {
      waitUntil: vi.fn(),
    } as unknown as ExecutionContext;
  });

  describe("Text-to-Speech (TTS) Request", () => {
    it("should handle TTS request with default voice", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "tts-1",
          input: "Hello, world!",
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "tts-1",
        input: "Hello, world!",
      });

      const mockSpeechResponse = {
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
      };

      (OpenAI.prototype.audio.speech.create as Mock).mockResolvedValue(mockSpeechResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("audio/mpeg");

      // Verify OpenAI method was called with correct parameters
      expect(OpenAI.prototype.audio.speech.create).toHaveBeenCalledWith({
        model: "tts-1",
        voice: "alloy",
        input: "Hello, world!",
        response_format: "mp3",
        speed: 1,
      });
    });

    it("should handle TTS request with custom voice and speed", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "tts-1-hd",
          input: "Custom voice test",
          voice: "nova",
          speed: 1.5,
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "tts-1-hd",
        input: "Custom voice test",
        voice: "nova",
        speed: 1.5,
      });

      const mockSpeechResponse = {
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
      };

      (OpenAI.prototype.audio.speech.create as Mock).mockResolvedValue(mockSpeechResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("audio/mpeg");

      // Verify OpenAI method was called with correct parameters
      expect(OpenAI.prototype.audio.speech.create).toHaveBeenCalledWith({
        model: "tts-1-hd",
        voice: "nova",
        input: "Custom voice test",
        response_format: "mp3",
        speed: 1.5,
      });
    });

    it("should handle TTS request error", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "tts-1",
          input: "Error test",
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "tts-1",
        input: "Error test",
      });

      (OpenAI.prototype.audio.speech.create as Mock).mockRejectedValueOnce(new Error("TTS error"));

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorBody = await response.json();
      expect(errorBody).toEqual({ error: "TTS processing failed" });
    });
  });

  describe("Whisper Transcription Request", () => {
    it("should handle whisper transcription", async () => {
      const mockFile = new File(["test audio data"], "audio.mp3", { type: "audio/mpeg" });
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "whisper-1",
          file: mockFile,
          prompt: "Optional context",
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "whisper-1",
        file: mockFile,
        prompt: "Optional context",
      });

      const mockTranscription = "Transcribed text goes here";
      (OpenAI.prototype.audio.transcriptions.create as Mock).mockResolvedValue(mockTranscription);

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const transcriptionBody = await response.json();
      expect(transcriptionBody).toEqual(mockTranscription);

      // Verify OpenAI method was called with correct parameters
      expect(OpenAI.prototype.audio.transcriptions.create).toHaveBeenCalledWith({
        model: "whisper-1",
        file: mockFile,
        response_format: "text",
        prompt: "Optional context",
      });
    });

    it("should handle whisper request without file", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "whisper-1",
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "whisper-1",
      });

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(400);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorBody = await response.json();
      expect(errorBody).toEqual({ error: "No audio file provided" });
    });

    it("should handle whisper transcription error", async () => {
      const mockFile = new File(["test audio data"], "audio.mp3", { type: "audio/mpeg" });
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "whisper-1",
          file: mockFile,
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "whisper-1",
        file: mockFile,
      });

      (OpenAI.prototype.audio.transcriptions.create as Mock).mockRejectedValueOnce(
        new Error("Transcription error"),
      );

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorBody = await response.json();
      expect(errorBody).toHaveProperty("error", "Whisper processing failed");
    });
  });

  describe("Chat Completion Streaming Request", () => {
    it("should handle streaming chat completion", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Hello" }],
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Hello" }],
      });

      const mockStream = {
        [Symbol.asyncIterator]: vi.fn().mockReturnValue({
          next: vi.fn()
            .mockResolvedValueOnce({
              value: {
                choices: [{
                  delta: { content: "Hello " },
                }],
              },
              done: false,
            })
            .mockResolvedValueOnce({
              value: {
                choices: [{
                  delta: { content: "world" },
                }],
              },
              done: false,
            })
            .mockResolvedValueOnce({ done: true }),
        }),
      };

      (OpenAI.prototype.chat.completions.create as Mock).mockResolvedValue(mockStream);

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/event-stream");

      // Verify OpenAI method was called with correct parameters
      expect(OpenAI.prototype.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Hello" }],
          stream: true,
        }),
      );
    });
  });
});

import OpenAI from "openai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type Env from "./env";
import { handleGPT4Request } from "./openaiHandler";
import { readRequestBody } from "./utils";

// Mock OpenAI class using vi.spyOn
const mockOpenAIAudioSpeechCreate = vi.fn();
const mockOpenAIAudioTranscriptionsCreate = vi.fn();
const mockOpenAIChatCompletionsCreate = vi.fn();

vi.mock("openai", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      audio: {
        speech: {
          create: mockOpenAIAudioSpeechCreate,
        },
        transcriptions: {
          create: mockOpenAIAudioTranscriptionsCreate,
        },
      },
      chat: {
        completions: {
          create: mockOpenAIChatCompletionsCreate,
        },
      },
    })),
  };
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

      // Mock the specific return value for this test case
      mockOpenAIAudioSpeechCreate.mockResolvedValueOnce({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
      });

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("audio/mpeg");

      // Verify OpenAI method was called with correct parameters
      expect(mockOpenAIAudioSpeechCreate).toHaveBeenCalledWith({
        model: "tts-1",
        input: "Hello, world!",
        voice: "alloy", // Default voice
        response_format: "mp3", // Default response format
        speed: 1, // default
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

      // Mock the specific return value for this test case
      mockOpenAIAudioSpeechCreate.mockResolvedValueOnce({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
      });

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("audio/mpeg");

      // Verify OpenAI method was called with correct parameters
      expect(mockOpenAIAudioSpeechCreate).toHaveBeenCalledWith({
        model: "tts-1-hd",
        input: "Custom voice test",
        voice: "nova",
        response_format: "mp3", // default
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

      // Mock the specific return value for this test case
      mockOpenAIAudioSpeechCreate.mockRejectedValueOnce(new Error("TTS error"));

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorBody = await response.json();
      expect(errorBody).toEqual({ error: "TTS processing failed" });
    });
  });

  describe("Whisper Transcription Request", () => {
    it("should handle whisper transcription", async () => {
      const mockFile = new File(["test audio data"], "audio.mp3", {
        type: "audio/mpeg",
      });
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
      // Mock the specific return value for this test case
      mockOpenAIAudioTranscriptionsCreate.mockResolvedValue(mockTranscription);

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const transcriptionBody = await response.json();
      expect(transcriptionBody).toEqual({ text: mockTranscription });

      // Verify OpenAI method was called with correct parameters
      expect(mockOpenAIAudioTranscriptionsCreate).toHaveBeenCalledWith({
        model: "whisper-1",
        file: mockFile,
        prompt: "Optional context",
        response_format: "json", // default
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
      const mockFile = new File(["test audio data"], "audio.mp3", {
        type: "audio/mpeg",
      });
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

      // Mock the specific return value for this test case
      mockOpenAIAudioTranscriptionsCreate.mockRejectedValueOnce(new Error("Transcription error"));

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorBody = await response.json();
      expect(errorBody).toEqual({ error: "Whisper processing failed" });
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

      const mockStream = async function*() {
        yield { choices: [{ delta: { content: "Hello " } }] };
        yield { choices: [{ delta: { content: "world" } }] };
      };

      // Mock the specific return value for this test case
      mockOpenAIChatCompletionsCreate.mockResolvedValueOnce(mockStream());

      const response = await handleGPT4Request(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/event-stream");

      // Verify OpenAI method was called with correct parameters
      expect(mockOpenAIChatCompletionsCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Hello" }],
          stream: true,
        }),
      );
    });
  });
});

import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import type Env from "../env.js";
import { createMockEnv } from "../test-utils.js";

// Mock external modules - must be before any imports that use them
vi.mock("../anthropicHandler.js", () => ({
  handleAnthropicRequest: vi.fn(),
}));

vi.mock("../openaiHandler.js", () => ({
  handleGPT4Request: vi.fn(),
}));

vi.mock("../replicateHandler.js", () => ({
  handleReplicateRequest: vi.fn(),
}));

vi.mock("../mainFetchHandler.js", () => ({
  handleMainFetch: vi.fn(),
}));

// Use a class mock for KVLogger
vi.mock("../Logs.js", () => {
  const mockLog = vi.fn().mockResolvedValue(undefined);
  return {
    KVLogger: class MockKVLogger {
      log = mockLog;
      getLogs = vi.fn().mockResolvedValue([]);
    },
  };
});

vi.mock("@cloudflare/kv-asset-handler", () => ({
  getAssetFromKV: vi.fn(),
}));

const mockKvServer = {
  isAsset: vi.fn().mockReturnValue(false),
  serve: vi.fn(),
};

vi.mock("@spike-npm-land/code", () => ({
  serverFetchUrl: "/api/fetch",
  serveWithCache: vi.fn(() => mockKvServer),
}));

vi.mock("../staticContent.mjs", () => ({
  ASSET_HASH: "test-hash-12345",
  ASSET_MANIFEST: "{}",
  files: { "test.js": "test.js" },
}));

// Import the main handler after mocks are set up
import main, { handleCMSIndexRequest } from "../chat.js";
import { handleAnthropicRequest } from "../anthropicHandler.js";
import { handleGPT4Request } from "../openaiHandler.js";
import { handleReplicateRequest } from "../replicateHandler.js";
import { handleMainFetch } from "../mainFetchHandler.js";

describe("Chat Handler", () => {
  let mockEnv: ReturnType<typeof createMockEnv>;
  let mockCtx: ExecutionContext;

  beforeEach(() => {
    vi.resetAllMocks();

    mockEnv = createMockEnv();
    mockCtx = {
      waitUntil: vi.fn(),
      passThroughOnException: () => {},
      props: {},
    } as unknown as ExecutionContext;

    // Setup default mock for __STATIC_CONTENT
    (mockEnv.__STATIC_CONTENT.get as Mock).mockResolvedValue(null);
  });

  describe("Service Worker Version Endpoints", () => {
    it("should return swVersion.mjs with correct hash", async () => {
      const request = new Request("https://example.com/swVersion.mjs");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/javascript");
      expect(response.headers.get("x-hash")).toBe("test-hash-12345");

      const text = await response.text();
      expect(text).toContain("export const swVersion");
      expect(text).toContain("test-hash-12345");
    });

    it("should return swVersion.mjs for aliased path", async () => {
      const request = new Request("https://example.com/@/lib/swVersion.mjs");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/javascript");
    });

    it("should return swVersion.json with correct format", async () => {
      const request = new Request("https://example.com/swVersion.json");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");

      const json = await response.json();
      expect(json).toHaveProperty("swVersion", "test-hash-12345");
    });

    it("should return swVersion.js with files data", async () => {
      const request = new Request("https://example.com/swVersion.js");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/javascript");

      const text = await response.text();
      expect(text).toContain("self.swVersion");
      expect(text).toContain("self.files");
    });
  });

  describe("Chat Application Routes", () => {
    it("should serve landing page for root path", async () => {
      const request = new Request("https://example.com/");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=UTF-8");
      expect(response.headers.get("Cache-Control")).toBe("no-cache");

      const text = await response.text();
      expect(text).toContain("Welcome to Chat");
      expect(text).toContain("Start Chatting");
    });

    it("should serve landing page for /index.html path", async () => {
      const request = new Request("https://example.com/index.html");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=UTF-8");

      const text = await response.text();
      expect(text).toContain("Welcome to Chat");
    });

    it("should serve custom landing page from static content if available", async () => {
      const customHtml = "<html><body>Custom Landing</body></html>";
      (mockEnv.__STATIC_CONTENT.get as Mock).mockResolvedValue(customHtml);

      const request = new Request("https://example.com/");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toBe(customHtml);
    });

    it("should serve chat application page for /chat path", async () => {
      const request = new Request("https://example.com/chat");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=UTF-8");

      const text = await response.text();
      expect(text).toContain("Conversations");
      expect(text).toContain("New Chat");
      expect(text).toContain("messages-container");
      expect(text).toContain("chat-input");
    });

    it("should serve custom chat page from static content if available", async () => {
      const customChatHtml = "<html><body>Custom Chat</body></html>";
      (mockEnv.__STATIC_CONTENT.get as Mock).mockResolvedValue(customChatHtml);

      const request = new Request("https://example.com/chat");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toBe(customChatHtml);
    });
  });

  describe("MCP Server Routes", () => {
    it("should handle MCP routes with codeSpace from header", async () => {
      const request = new Request("https://example.com/mcp/test", {
        headers: { "X-CodeSpace": "my-codespace" },
      });

      const mockStub = {
        fetch: vi.fn().mockResolvedValue(new Response("MCP response")),
      };
      const mockId = { toString: () => "mock-id" };
      (mockEnv.CODE.idFromName as Mock).mockReturnValue(mockId);
      (mockEnv.CODE.get as Mock).mockReturnValue(mockStub);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockEnv.CODE.idFromName).toHaveBeenCalledWith("my-codespace");
      expect(mockEnv.CODE.get).toHaveBeenCalledWith(mockId);
      expect(mockStub.fetch).toHaveBeenCalled();
      expect(response.status).toBe(200);
    });

    it("should handle MCP routes with codeSpace from query param", async () => {
      const request = new Request("https://example.com/mcp/test?codeSpace=query-space");

      const mockStub = {
        fetch: vi.fn().mockResolvedValue(new Response("MCP response")),
      };
      const mockId = { toString: () => "mock-id" };
      (mockEnv.CODE.idFromName as Mock).mockReturnValue(mockId);
      (mockEnv.CODE.get as Mock).mockReturnValue(mockStub);

      await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockEnv.CODE.idFromName).toHaveBeenCalledWith("query-space");
    });

    it("should use default codeSpace when not provided", async () => {
      const request = new Request("https://example.com/mcp/test");

      const mockStub = {
        fetch: vi.fn().mockResolvedValue(new Response("MCP response")),
      };
      const mockId = { toString: () => "mock-id" };
      (mockEnv.CODE.idFromName as Mock).mockReturnValue(mockId);
      (mockEnv.CODE.get as Mock).mockReturnValue(mockStub);

      await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockEnv.CODE.idFromName).toHaveBeenCalledWith("default");
    });
  });

  describe("API Handler Routes", () => {
    it("should route anthropic requests to anthropic handler", async () => {
      const request = new Request("https://example.com/api/anthropic");
      const mockResponse = new Response("Anthropic response");
      (handleAnthropicRequest as Mock).mockResolvedValue(mockResponse);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(handleAnthropicRequest).toHaveBeenCalledWith(request, mockEnv);
      expect(mockCtx.waitUntil).toHaveBeenCalled();
      expect(response).toBe(mockResponse);
    });

    it("should route openai requests to GPT4 handler", async () => {
      const request = new Request("https://example.com/api/openai");
      const mockResponse = new Response("OpenAI response");
      (handleGPT4Request as Mock).mockResolvedValue(mockResponse);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(handleGPT4Request).toHaveBeenCalledWith(request, mockEnv);
      expect(response).toBe(mockResponse);
    });

    it("should route replicate requests to replicate handler", async () => {
      const request = new Request("https://example.com/api/replicate");
      const mockResponse = new Response("Replicate response");
      (handleReplicateRequest as Mock).mockResolvedValue(mockResponse);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(handleReplicateRequest).toHaveBeenCalledWith(request, mockEnv, mockCtx);
      expect(response).toBe(mockResponse);
    });
  });

  describe("AI Feature Routes", () => {
    it("should handle summarize requests", async () => {
      const request = new Request("https://example.com/api/summarize", {
        method: "POST",
        body: JSON.stringify({ text: "Long text to summarize" }),
        headers: { "Content-Type": "application/json" },
      });

      const mockAiResponse = { summary: "Short summary" };
      const mockAI = mockEnv.AI as { run: Mock };
      (mockAI.run as Mock).mockResolvedValue(mockAiResponse);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockAI.run).toHaveBeenCalledWith(
        "@cf/facebook/bart-large-cnn",
        expect.objectContaining({
          input_text: "Long text to summarize",
          max_length: 1024,
        })
      );
      expect(response.status).toBe(200);
    });

    it("should handle whisper audio transcription", async () => {
      const audioBlob = new Blob(["fake audio data"], { type: "audio/wav" });
      const formData = new FormData();
      formData.append("record.wav", audioBlob, "record.wav");

      const request = new Request("https://example.com/api/whisper", {
        method: "POST",
        body: formData,
      });

      const mockTranscription = { text: "Transcribed text" };
      const mockAI = mockEnv.AI as { run: Mock };
      (mockAI.run as Mock).mockResolvedValue(mockTranscription);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockAI.run).toHaveBeenCalledWith(
        "@cf/openai/whisper-tiny-en",
        expect.objectContaining({
          audio: expect.any(Array),
        })
      );
      expect(response.status).toBe(200);
    });
  });

  describe("AI Logs Route", () => {
    it("should return AI logs from KV", async () => {
      const request = new Request("https://example.com/api/ai-logs");

      (mockEnv.KV.get as Mock).mockImplementation(async (key: string) => {
        if (key === "ai:counter") return "3";
        if (key === "ai:1") return JSON.stringify({ message: "log1" });
        if (key === "ai:2") return JSON.stringify({ message: "log2" });
        if (key === "ai:3") return JSON.stringify({ message: "log3" });
        return null;
      });

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const logs = await response.json();
      expect(logs).toHaveLength(3);
    });
  });

  describe("Transpile Endpoint", () => {
    it("should forward transpile requests to esbuild service", async () => {
      const codeToTranspile = "const x: number = 42;";
      const request = new Request("https://example.com/transpile", {
        method: "POST",
        body: codeToTranspile,
      });

      const transpiledCode = "const x = 42;";
      global.fetch = vi.fn().mockResolvedValue(new Response(transpiledCode));

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://esbuild.spikeland.workers.dev",
        expect.objectContaining({
          method: "POST",
          body: codeToTranspile,
        })
      );
      expect(response.headers.get("Content-Type")).toBe("application/javascript");
    });
  });

  describe("SW Config Endpoint", () => {
    it("should return service worker config", async () => {
      const request = new Request("https://example.com/sw-config.json");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const config = await response.json();
      expect(config).toHaveProperty("killSwitch", false);
      expect(config).toHaveProperty("version", "v16");
      expect(config).toHaveProperty("swVersion", "test-hash-12345");
      expect(config).toHaveProperty("valid");
    });
  });

  describe("ASSET_MANIFEST Endpoint", () => {
    it("should return asset manifest", async () => {
      const request = new Request("https://example.com/ASSET_MANIFEST");

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("Server Fetch URL Endpoint", () => {
    it("should proxy fetch requests", async () => {
      const request = new Request("https://example.com/api/fetch", {
        method: "POST",
        body: JSON.stringify({ url: "https://httpbin.org/get", method: "GET" }),
        headers: { "Content-Type": "application/json" },
      });

      const mockProxyResponse = new Response(JSON.stringify({ success: true }));
      global.fetch = vi.fn().mockResolvedValue(mockProxyResponse);

      await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://httpbin.org/get",
        expect.objectContaining({ url: "https://httpbin.org/get" })
      );
    });
  });

  describe("TURN Credentials Endpoint", () => {
    it("should generate TURN credentials", async () => {
      const request = new Request("https://example.com/api/my-turn");

      const mockTurnResponse = {
        iceServers: [{ urls: "turn:example.com" }],
      };
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockTurnResponse), { status: 200 })
      );

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("cloudflare.com"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Authorization": expect.stringContaining("Bearer"),
          }),
        })
      );
      expect(response.status).toBe(200);
    });

    it("should handle TURN credentials failure", async () => {
      const request = new Request("https://example.com/api/my-turn");

      global.fetch = vi.fn().mockResolvedValue(
        new Response("Unauthorized", { status: 401 })
      );

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(response.status).toBe(500);
      const json = await response.json();
      expect(json).toHaveProperty("error");
    });
  });

  describe("KV Logging", () => {
    it("should log requests to KV", async () => {
      const request = new Request("https://example.com/api/openai");
      (handleGPT4Request as Mock).mockResolvedValue(new Response("OK"));

      await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(mockEnv.KV.put).toHaveBeenCalledWith("lastRequest", request.url);
    });
  });

  describe("Fallback to Main Fetch Handler", () => {
    it("should fallback to main fetch handler for unknown routes", async () => {
      const request = new Request("https://example.com/unknown/path");
      const mockResponse = new Response("Main handler response");
      (handleMainFetch as Mock).mockResolvedValue(mockResponse);

      const response = await main.fetch(request, mockEnv as unknown as Env, mockCtx);

      expect(handleMainFetch).toHaveBeenCalledWith(request, mockEnv, mockCtx);
      expect(response).toBe(mockResponse);
    });
  });
});

describe("handleCMSIndexRequest", () => {
  let mockEnv: ReturnType<typeof createMockEnv>;

  beforeEach(() => {
    vi.resetAllMocks();
    mockEnv = createMockEnv();
  });

  describe("PUT requests", () => {
    it("should store content in R2", async () => {
      const content = "Test CMS content";
      const request = new Request("https://example.com/my-cms/article", {
        method: "PUT",
        body: content,
      });

      (mockEnv.R2.put as Mock).mockResolvedValue({});

      const response = await handleCMSIndexRequest(request, mockEnv as unknown as Env);

      expect(mockEnv.R2.put).toHaveBeenCalledWith(
        request.url,
        expect.anything()
      );
      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toContain("successfully");
    });
  });

  describe("DELETE requests", () => {
    it("should delete content from R2", async () => {
      const request = new Request("https://example.com/my-cms/article", {
        method: "DELETE",
      });

      (mockEnv.R2.delete as Mock).mockResolvedValue({});

      const response = await handleCMSIndexRequest(request, mockEnv as unknown as Env);

      expect(mockEnv.R2.delete).toHaveBeenCalledWith(request.url);
      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toContain("DEL");
      expect(text).toContain("successfully");
    });
  });

  describe("GET requests", () => {
    it("should return 404 if content not found", async () => {
      const request = new Request("https://example.com/my-cms/nonexistent");

      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const response = await handleCMSIndexRequest(request, mockEnv as unknown as Env);

      expect(response.status).toBe(404);
      const text = await response.text();
      expect(text).toBe("Not found");
    });
  });

  describe("Unsupported methods", () => {
    it("should return 405 for unsupported methods", async () => {
      const request = new Request("https://example.com/my-cms/article", {
        method: "PATCH",
      });

      const response = await handleCMSIndexRequest(request, mockEnv as unknown as Env);

      expect(response.status).toBe(405);
      const text = await response.text();
      expect(text).toBe("Method not allowed");
    });

    it("should return 405 for POST method", async () => {
      const request = new Request("https://example.com/my-cms/article", {
        method: "POST",
      });

      const response = await handleCMSIndexRequest(request, mockEnv as unknown as Env);

      expect(response.status).toBe(405);
    });
  });
});

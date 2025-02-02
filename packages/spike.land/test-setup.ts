import type { WebSocket } from "@cloudflare/workers-types";
import { type MockInstance, vi } from "vitest";
globalThis.Date = Date;

// Enhanced WebSocket mock implementation
interface MockWebSocket {
  accept: MockInstance;
  send: MockInstance;
  close: MockInstance;
  addEventListener: MockInstance;
  readyState: number;
  onmessage: ((event: MessageEvent) => void) | null;
  onclose: ((event: CloseEvent) => void) | null;
}

// Improved WebSocketPair mock
if (!("WebSocketPair" in globalThis)) {
  (globalThis as any).WebSocketPair = function() {
    const wsStub: MockWebSocket = {
      send: vi.fn(),
      close: vi.fn(),
      accept: vi.fn(),
      addEventListener: vi.fn((type: string, listener: EventListener) => {
        if (type === "message") {
          wsStub.onmessage = listener as any;
        } else if (type === "close") {
          wsStub.onclose = listener as any;
        }
      }),
      readyState: 1,
      onmessage: null as ((event: MessageEvent) => void) | null,
      onclose: null as ((event: CloseEvent) => void) | null,
    };
    return [wsStub, wsStub];
  };
}

global.Response = class extends Response {
  constructor(body?: BodyInit | null, init?: ResponseInit) {
    // Allow 101 and statuses between 200 and 599
    if (init?.status && init.status !== 101 && (init.status < 200 || init.status > 599)) {
      init.status = 500;
    }
    super(body, init);
  }
};

// Mock Durable Object state
vi.mock("@cloudflare/workers-types", () => {
  const mockStorage = {
    get: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue(undefined),
  };

  const mockBlockConcurrencyWhile = vi.fn(async (fn) => {
    return await fn();
  });

  return {
    DurableObject: class {
      state = {
        storage: mockStorage,
        blockConcurrencyWhile: mockBlockConcurrencyWhile,
      };
    },
  };
});

// Global fetch mock
global.fetch = vi.fn().mockResolvedValue({
  json: vi.fn().mockResolvedValue({}),
  text: vi.fn().mockResolvedValue(""),
});

// Simplified URL mock with manual parsing
global.URL = class {
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
  hash: string;

  constructor(url: string | URL, base?: string | URL) {
    const urlString = typeof url === "string" ? url : url.toString();
    const baseString = base ? (typeof base === "string" ? base : base.toString()) : undefined;

    const fullUrl = baseString ? `${baseString}${urlString}` : urlString;
    const parsedUrl = this.parseUrl(fullUrl);

    this.href = fullUrl;
    this.origin = parsedUrl.origin;
    this.protocol = parsedUrl.protocol;
    this.username = "";
    this.password = "";
    this.host = parsedUrl.host;
    this.hostname = parsedUrl.hostname;
    this.port = parsedUrl.port;
    this.pathname = parsedUrl.pathname;
    this.search = parsedUrl.search;
    this.searchParams = new URLSearchParams(parsedUrl.search);
    this.hash = parsedUrl.hash;
  }

  private parseUrl(url: string): {
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  } {
    const protocolMatch = url.match(/^([a-z]+):\/\//i);
    const protocol = protocolMatch ? protocolMatch[1].toLowerCase() + ":" : "https:";

    const withoutProtocol = url.replace(/^[a-z]+:\/\//i, "");
    const [hostPath, hash = ""] = withoutProtocol.split("#");
    const [hostSearch, search = ""] = hostPath.split("?");
    const [host, ...pathParts] = hostSearch.split("/");

    const [hostname, port = ""] = host.split(":");
    const pathname = "/" + pathParts.join("/");

    return {
      origin: `${protocol}//${host}`,
      protocol,
      host,
      hostname,
      port,
      pathname,
      search: search ? `?${search}` : "",
      hash: hash ? `#${hash}` : "",
    };
  }

  toString(): string {
    return this.href;
  }

  toJSON(): string {
    return this.href;
  }

  static canParse = (url: string | URL, base?: string | URL) => {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };

  static createObjectURL = (obj: Blob | MediaSource) => {
    return URL.createObjectURL(obj);
  };

  static parse = (url: string | URL, base?: string | URL) => {
    try {
      return new URL(url, base);
    } catch {
      return null;
    }
  };

  static revokeObjectURL = (url: string) => {
    URL.revokeObjectURL(url);
  };
};

/* Additional Global Mocks for tests */
global.Date = Date;
global.OpenAI = class {
  async audioTTS(params: any) {
    if (params.model === "tts-1") {
      return {
        status: 200,
        headers: { get: () => "application/json" },
        json: async () => ({ id: "test-id", content: [{ text: "Test response" }] }),
      };
    } else if (params.model === "tts-1-hd") {
      return {
        status: 200,
        headers: { get: () => "application/json" },
        json: async () => ({ id: "test-id-hd", content: [{ text: "Test response HD" }] }),
      };
    }
    return {
      status: 500,
      headers: { get: () => "application/json" },
      json: async () => ({ error: "TTS error" }),
    };
  }
  chat = {
    completions: {
      create: async (params: any) => {
        if (params.stream) {
          const streamResponse = {
            [Symbol.asyncIterator]: async function*() {
              yield {
                choices: [
                  { delta: { content: "Test streaming response" } },
                ],
              };
            },
            asyncIterator: () => streamResponse[Symbol.asyncIterator](),
          };

          return streamResponse;
        } else {
          return {
            choices: [{ message: { content: "Test chat response" } }],
          };
        }
      },
    },
  };
  async whisperTranscription(params: any) {
    if (params.error) {
      return {
        status: 500,
        headers: { get: () => "application/json" },
        json: async () => ({ error: "Transcription error" }),
      };
    }
    return {
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({ transcription: "Test transcription" }),
    };
  }
};
global.R2 = {
  put: vi.fn().mockImplementation((key: string, blob: any) => {
    const size = blob && blob.size !== undefined ? blob.size : 0;
    if (size === 0) {
      return { status: 400, text: async () => "Bad Request" };
    }
    return { status: 200, text: async () => "Object stored" };
  }),
  get: vi.fn().mockResolvedValue({ status: 200, text: async () => "Stored object" }),
};
global.CodeRateLimiter = class {
  async handleRequest() {
    return 0;
  }
};

import { beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "./chatRoom";
import type Env from "./env";
import { RouteHandler } from "./routeHandler";
import type { MockContainer, MockKV, MockR2Bucket, MockSql, MockStaticContent } from "./types/test";

vi.mock("./routeHandler", () => ({
  RouteHandler: vi.fn(),
}));

describe("Hono app routes", () => {
  vi.mock("snakecase-keys", () => ({}));

  const state = {
    storage: {
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      deleteAll: vi.fn(),
      transaction: vi.fn(),
      getAlarm: vi.fn(),
      setAlarm: vi.fn(),
      deleteAlarm: vi.fn(),
      listAlarms: vi.fn(),
      sync: vi.fn(),
      sql: {
        exec: vi.fn(),
        batch: vi.fn(),
        run: vi.fn(),
        get: vi.fn(),
        all: vi.fn(),
        raw: vi.fn(),
        values: vi.fn(),
        first: vi.fn(),
        dump: vi.fn(),
        databaseSize: () => 0,
        prepare: vi.fn(),
      } satisfies MockSql,
      transactionSync: vi.fn(),
      getCurrentBookmark: vi.fn(),
      resetBookmark: vi.fn(),
      updateBookmark: vi.fn(),
      deleteBookmark: vi.fn(),
      getBookmarkForTime: vi.fn(),
      onNextSessionRestoreBookmark: vi.fn(),
    },
    id: {
      toString: () => "test",
      equals: vi.fn(),
    },
    metadata: {
      room: "test",
    },
    blockConcurrencyWhile: vi.fn((callback) => callback()),
    waitUntil: vi.fn(),
    acceptWebSocket: vi.fn(),
    getWebSockets: vi.fn(),
    setWebSocketAutoResponse: vi.fn(),
    getWebSocketAutoResponse: vi.fn(),
    getWebSocketAutoResponseTimestamp: vi.fn(),
    setHibernatableWebSocketEventTimeout: vi.fn(),
    getHibernatableWebSocketEventTimeout: vi.fn(),
    getTags: vi.fn(),
    abort: vi.fn(),
    container: {
      fetch: vi.fn(() => Promise.resolve(new Response())),
      getTcpPort: vi.fn(() => ({
        fetch: vi.fn(() => Promise.resolve(new Response())),
      })),
    } satisfies MockContainer,
  } as unknown as DurableObjectState;

  const env: Env = {
    OPENAI_API_KEY: "",
    AI: {
      run: vi.fn(),
      models: {
        list: vi.fn(),
        get: vi.fn(),
      },
      gateway: {
        logId: vi.fn(),
      },
      aiGatewayLogId: "test-log-id",
    } as unknown as Env["AI"],
    KV: {
      get: vi.fn(),
      put: vi.fn(),
      list: vi.fn(),
      getWithMetadata: vi.fn(),
      delete: vi.fn(),
    } satisfies MockKV,
    __STATIC_CONTENT: {
      get: vi.fn(),
      list: vi.fn(),
      put: vi.fn(),
      getWithMetadata: vi.fn(),
      delete: vi.fn(),
    } satisfies MockStaticContent,
    REPLICATE_API_TOKEN: "",
    ANTHROPIC_API_KEY: "",
    CLERK_SECRET_KEY: "",
    CF_REAL_TURN_TOKEN: "",
    ESBUILD: {
      fetch: function(
        _input: RequestInfo | URL,
        _init?: RequestInit,
      ): Promise<Response> {
        throw new Error("Function not implemented.");
      },
      connect: function(
        _address: SocketAddress | string,
        _options?: SocketOptions,
      ): Socket {
        throw new Error("Function not implemented.");
      },
    },
    CODE: {
      newUniqueId: vi.fn(),
      idFromName: vi.fn(),
      idFromString: vi.fn(),
      get: vi.fn(),
      jurisdiction: vi.fn(),
    } as unknown as DurableObjectNamespace,
    LIMITERS: {
      newUniqueId: vi.fn(),
      idFromName: vi.fn(),
      idFromString: vi.fn(),
      get: vi.fn(),
      jurisdiction: vi.fn(),
    } as unknown as DurableObjectNamespace,
    R2: {
      head: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      createMultipartUpload: vi.fn(),
      resumeMultipartUpload: vi.fn(),
    } satisfies MockR2Bucket,
    X9: {
      head: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      createMultipartUpload: vi.fn(),
      resumeMultipartUpload: vi.fn(),
    } satisfies MockR2Bucket,
  };

  let app: Code;
  let mockRouteHandler: {
    handleUsersRoute: ReturnType<typeof vi.fn>;
    handleWebsocketRoute: ReturnType<typeof vi.fn>;
    handleCodeRoute: ReturnType<typeof vi.fn>;
    handleSessionRoute: ReturnType<typeof vi.fn>;
    handleAutoSaveRoute: ReturnType<typeof vi.fn>;
    handleLiveRoute: ReturnType<typeof vi.fn>;
    handleRoute: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockRouteHandler = {
      handleUsersRoute: vi.fn(),
      handleWebsocketRoute: vi.fn(),
      handleCodeRoute: vi.fn(),
      handleSessionRoute: vi.fn(),
      handleAutoSaveRoute: vi.fn(),
      handleLiveRoute: vi.fn(),
      handleRoute: vi.fn(async (request: Request, url: URL, path: string[]) => {
        switch (path[0]) {
          case "users":
            return mockRouteHandler.handleUsersRoute(request, url, path);
          case "websocket":
            return mockRouteHandler.handleWebsocketRoute(request, url, path);
          case "code":
            return mockRouteHandler.handleCodeRoute(request, url, path);
          case "session":
            return mockRouteHandler.handleSessionRoute(request, url, path);
          case "auto-save":
            return mockRouteHandler.handleAutoSaveRoute(request, url, path);
          case "live":
            return mockRouteHandler.handleLiveRoute(request, url, path);
          default:
            return new Response("Not found", { status: 404 });
        }
      }),
    };

    (RouteHandler as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => mockRouteHandler as unknown as RouteHandler,
    );

    app = new Code(state, env);
    app.fetch = vi.fn(app.fetch.bind(app));
  });

  it("should handle /users route", async () => {
    const mockUserResponse = new Response("Users response");
    mockRouteHandler.handleUsersRoute.mockResolvedValue(mockUserResponse);

    const res = await app.fetch(
      new Request("https://example.com/users?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Users response");
  });

  it("should handle /websocket route", async () => {
    const websocketResponse = new Response("Websocket response");
    mockRouteHandler.handleWebsocketRoute.mockResolvedValue(websocketResponse);

    const res = await app.fetch(
      new Request("https://example.com/websocket?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Websocket response");
  });

  it("should handle /code route", async () => {
    const mockResponse = new Response("Code response");
    mockRouteHandler.handleCodeRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(
      new Request("https://example.com/code?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Code response");
  });

  it("should handle /session route", async () => {
    const mockResponse = new Response("Session response");
    mockRouteHandler.handleSessionRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(
      new Request("https://example.com/session?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Session response");
  });

  it("should handle /auto-save route", async () => {
    const mockResponse = new Response("Auto-save response");
    mockRouteHandler.handleAutoSaveRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(
      new Request("https://example.com/auto-save/history?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Auto-save response");
  });

  it("should handle /live route", async () => {
    const mockResponse = new Response("Live response");
    mockRouteHandler.handleLiveRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(
      new Request("https://example.com/live/some/path?room=test"),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Live response");
  });
});

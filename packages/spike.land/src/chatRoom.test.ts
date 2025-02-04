import type { DurableObjectState } from "@cloudflare/workers-types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "./chatRoom";
import type Env from "./env";
import { RouteHandler } from "./routeHandler";

vi.mock("./routeHandler");

describe("Hono app routes", () => {
  const state = {
    storage: {
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
    },
    id: { toString: () => "test" },
    metadata: {
      room: "test",
    },
    blockConcurrencyWhile: vi.fn((callback) => callback()),
    waitUntil: vi.fn(),
  } as unknown as DurableObjectState;

  const env: Partial<Env> = {};

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

    vi.mocked(RouteHandler).mockImplementation(() => mockRouteHandler as unknown as RouteHandler);

    app = new Code(state, env as Env);
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

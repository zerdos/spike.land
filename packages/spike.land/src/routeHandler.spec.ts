import { importMap } from "@spike-npm-land/code";
const md5Promise = import("@spike-npm-land/code").then(m => m.md5);
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "./chatRoom";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";

vi.mock("snakecase-keys", () => ({}));

describe("RouteHandler", () => {
  let routeHandler: RouteHandler;
  let mockCode: Partial<Code>;

  beforeEach(() => {
    // Create a mock Code object with necessary methods
    mockCode = {
      getSession: vi.fn().mockReturnValue({
        code: "mock code",
        html: "mock html",
        css: "mock css",
        transpiled: "mock transpiled code",
        codeSpace: "test-space",
      }),
      getState: vi.fn().mockReturnValue({
        storage: {
          list: vi.fn().mockResolvedValue({}),
          get: vi.fn().mockResolvedValue(null),
        },
      }),
      getEnv: vi.fn().mockReturnValue({}),
      getOrigin: vi.fn().mockReturnValue("https://example.com"),
      wsHandler: {
        handleWebsocketSession: vi.fn().mockResolvedValue(undefined),
      } as unknown as WebSocketHandler,
    };

    // Create RouteHandler with mock Code
    routeHandler = new RouteHandler(mockCode as Code);
  });

  describe("handleRoute", () => {
    it("should return 404 for unknown route", async () => {
      const request = new Request("https://example.com/unknown");
      const url = new URL("https://example.com/unknown");

      const response = await routeHandler.handleRoute(request, url, ["unknown"]);

      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Not found");
    });

    it("should handle known routes", async () => {
      const request = new Request("https://example.com/code");
      const url = new URL("https://example.com/code");

      const response = await routeHandler.handleRoute(request, url, ["code"]);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe("mock code");
    });
  });

  describe("Route Handlers", () => {
    describe("handleCodeRoute", () => {
      it("should return code with correct headers", async () => {
        const request = new Request("https://example.com/code");
        const url = new URL("https://example.com/code");

        const response = await routeHandler.handleRoute(request, url, ["code"]);

        expect(response.status).toBe(200);
        expect(await response.text()).toBe("mock code");
        expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
        const md5 = await md5Promise;
        expect(response.headers.get("content_hash")).toBe(md5("mock code"));
      });
    });

    describe("handleSessionRoute", () => {
      it("should return session JSON", async () => {
        const request = new Request("https://example.com/session.json?room=test-space");
        const url = new URL("https://example.com/session.json?room=test-space");

        const response = await routeHandler.handleRoute(request, url, ["session.json"]);

        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe("application/json; charset=UTF-8");
      });
    });

    describe("handleWebsocketRoute", () => {
      it("should handle websocket upgrade", async () => {
        const request = new Request("https://example.com/websocket", {
          headers: new Headers({ "Upgrade": "websocket" }),
        });
        const url = new URL("https://example.com/websocket");

        const response = await routeHandler.handleRoute(request, url, ["websocket"]);

        expect(response.status).toBe(101);
        expect(response.webSocket).toBeDefined();
        expect(response.webSocket).toHaveProperty("send");
        expect(response.webSocket).toHaveProperty("close");
        expect(mockCode.wsHandler?.handleWebsocketSession).toHaveBeenCalled();
      });

      it("should return 400 for non-websocket request", async () => {
        const request = new Request("https://example.com/websocket");
        const url = new URL("https://example.com/websocket");

        const response = await routeHandler.handleRoute(request, url, ["websocket"]);

        expect(response.status).toBe(400);
        expect(await response.text()).toBe("Expected websocket");
      });
    });

    describe("handleDefaultRoute", () => {
      it("should return HTML with correct replacements", async () => {
        const request = new Request("https://example.com");
        const url = new URL("https://example.com");

        const response = await routeHandler.handleRoute(request, url, [""]);

        expect(response.status).toBe(200);
        const responseText = await response.text();

        // Check for importmap replacement
        expect(responseText).toContain(
          `<script type="importmap">${JSON.stringify(importMap)}</script>`,
        );

        // Check for CSS link replacement
        expect(responseText).toContain(
          `<link rel="preload" href="/live/test-space/index.css" as="style" />`,
        );

        // Check for embed div replacement
        expect(responseText).toContain(`<div id="embed">mock html</div>`);
      });
    });

    describe("handleJsRoute", () => {
      it("should return transpiled JS with correct headers", async () => {
        const request = new Request("https://example.com/index.js");
        const url = new URL("https://example.com/index.js");

        const response = await routeHandler.handleRoute(request, url, ["index.js"]);

        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe("application/javascript; charset=UTF-8");
      });
    });

    describe("handleCssRoute", () => {
      it("should return CSS with correct headers", async () => {
        const request = new Request("https://example.com/index.css");
        const url = new URL("https://example.com/index.css");

        const response = await routeHandler.handleRoute(request, url, ["index.css"]);

        expect(response.status).toBe(200);
        expect(await response.text()).toBe("mock css");
        expect(response.headers.get("Content-Type")).toBe("text/css; charset=UTF-8");
      });
    });
  });
});

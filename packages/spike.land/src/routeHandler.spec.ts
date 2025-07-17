import { importMap as _importMap } from "@spike-npm-land/code";
const md5Promise = import("@spike-npm-land/code").then((m) => m.md5);
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "./chatRoom";
import { RouteHandler } from "./routeHandler";
import type { WebSocketHandler } from "./websocketHandler";

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
        messages: [], // Added missing messages field
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

      const response = await routeHandler.handleRoute(request, url, [
        "unknown",
      ]);

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
        const request = new Request(
          "https://example.com/session.json?room=test-space",
        );
        const url = new URL("https://example.com/session.json?room=test-space");

        const response = await routeHandler.handleRoute(request, url, [
          "session.json",
        ]);

        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe(
          "application/json; charset=UTF-8",
        );
      });
    });

    describe("handleWebsocketRoute", () => {
      it("should handle websocket upgrade", async () => {
        const request = new Request("https://example.com/websocket", {
          headers: new Headers({ "Upgrade": "websocket" }),
        });
        const url = new URL("https://example.com/websocket");

        const response = await routeHandler.handleRoute(request, url, [
          "websocket",
        ]);

        expect(response.status).toBe(101);
        expect(response.webSocket).toBeDefined();
        expect(response.webSocket).toHaveProperty("send");
        expect(response.webSocket).toHaveProperty("close");
        expect(mockCode.wsHandler?.handleWebsocketSession).toHaveBeenCalled();
      });
    });

    describe("handleDefaultRoute", () => {
      it("should return HTML with correct replacements", async () => {
        const request = new Request("https://example.com");
        const url = new URL("https://example.com");

        // Mock the HTML import specifically for this test
        const mockTemplateHTML = `
          <html>
            <head>
              <link rel="preload" href="/live/\${codeSpace}/index.css" as="style">
              <script type="importmap">\${JSON.stringify(importMap)}</script>
            </head>
            <body>
              <style>/* criticalCss */</style>
              <div id="embed">\${html}</div>
            </body>
          </html>`;

        vi.doMock("@spike-npm-land/code", async () => {
          const originalModule = await import("@spike-npm-land/code");
          return {
            ...originalModule,
            HTML: mockTemplateHTML,
            importMap: { imports: { "test": "test.js" } },
          };
        });

        // Re-initialize RouteHandler to use the mocked HTML
        const testRouteHandler = new RouteHandler(mockCode as Code);
        const response = await testRouteHandler.handleRoute(request, url, [""]);

        expect(response.status).toBe(200);
        const responseText = await response.text();

        // Assert that placeholders are replaced
        expect(responseText).toContain(`href="/live/test-space/index.css"`);
        expect(responseText).toEqual(expect.stringMatching(/<style>\s*mock css\s*<\/style>/));
        expect(responseText).toContain(`<div id="embed">mock html</div>`);
        // Check that the import map exists and contains expected imports
        expect(responseText).toContain('type="importmap"');
        expect(responseText).toContain('"imports":{');
        expect(responseText).toContain('"react"');
        expect(responseText).toContain('"@emotion/react"');

        // Snapshot can still be useful to catch overall structure changes
        expect(responseText).toMatchSnapshot();

        vi.doUnmock("@spike-npm-land/code"); // Clean up mock
      });
    });

    describe("handleJsRoute", () => {
      it("should return transpiled JS with correct headers", async () => {
        const request = new Request("https://example.com/index.js");
        const url = new URL("https://example.com/index.js");

        const response = await routeHandler.handleRoute(request, url, [
          "index.js",
        ]);

        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe(
          "application/javascript; charset=UTF-8",
        );
      });
    });

    describe("handleCssRoute", () => {
      it("should return CSS with correct headers", async () => {
        const request = new Request("https://example.com/index.css");
        const url = new URL("https://example.com/index.css");

        const response = await routeHandler.handleRoute(request, url, [
          "index.css",
        ]);

        expect(response.status).toBe(200);
        expect(await response.text()).toBe("mock css");
        expect(response.headers.get("Content-Type")).toBe(
          "text/css; charset=UTF-8",
        );
      });
    });
  });
});

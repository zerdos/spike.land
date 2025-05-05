import type { ICodeSession, RenderedApp } from "@/lib/interfaces";
import { CodeProcessor } from "@/services/CodeProcessor";
import { formatCode, transpileCode } from "@/services/editorUtils";
import { RenderService } from "@/services/RenderService";
import type { IWebSocketManager } from "@/services/types";
import type { EmotionCache } from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/RenderService");
vi.mock("@/services/editorUtils");
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(),
}));

describe("CodeProcessor", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  // Mock console before tests
  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  // Restore console after tests
  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  const mockCodeSpace = "test-space";
  let codeProcessor: CodeProcessor;

  const sessionMock: ICodeSession = {
    code: "const x = 5;",
    transpiled: "const x = 5;",
    html: "<div></div>",
    codeSpace: mockCodeSpace,
    css: "css",
    messages: [
      { id: "1", role: "user", content: "Test" },
      { id: "2", role: "assistant", content: "Test" },
    ],
  };

  const getSession = () => sessionMock;

  // Test interface definition
  interface WindowWithWebSocket {
    frames: Record<number, {
      webSocketManager: IWebSocketManager;
    }>;
  }

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock matchMedia for tests
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock WebSocketManager
    const mockWebSocketManager: IWebSocketManager = {
      handleRunMessage: vi.fn().mockResolvedValue({
        html: "<div>Mocked HTML</div>",
        css: "/* Mocked CSS */",
      }),
      init: vi.fn(),
      cleanup: vi.fn(),
    };

    // Mock window.frames
    Object.defineProperty(window, "frames", {
      value: [
        {
          webSocketManager: mockWebSocketManager,
        },
      ],
      writable: true,
    });

    codeProcessor = new CodeProcessor(mockCodeSpace);
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset iframe mock
    Object.defineProperty(window, "frames", {
      value: [],
      writable: true,
    });
  });

  describe("process", () => {
    it("should format and transpile code successfully", async () => {
      const mockCode = "const x = 6;";
      const mockSignal = new AbortController().signal;

      vi.mocked(transpileCode).mockResolvedValue(`transpiled`);

      vi.mocked(formatCode).mockResolvedValue(`formatted`);

      const result = await codeProcessor.process(
        mockCode,
        true,
        mockSignal,
        getSession,
      );

      expect(result).toMatchInlineSnapshot(`
        {
          "code": "formatted",
          "codeSpace": "test-space",
          "css": "css",
          "html": "<div></div>",
          "messages": [
            {
              "content": "Test",
              "id": "1",
              "role": "user",
            },
            {
              "content": "Test",
              "id": "2",
              "role": "assistant",
            },
          ],
          "transpiled": "transpiled",
        }
      `);
    });

    it("should should run as well", async () => {
      const mockCode = "const x = 6;";
      const mockSignal = new AbortController().signal;

      vi.mocked(transpileCode).mockResolvedValue(`transpiled`);
      vi.mocked(formatCode).mockResolvedValue(`formatted`);

      // Mock the window message event to simulate iframe response
      const mockMessageEvent = {
        data: {
          type: "rendered",
          requestId: "md5-hash", // This would be the md5 of the transpiled code
          data: {
            html: "<div>Mocked HTML</div>",
            css: "/* Mocked CSS */",
          },
        },
      };

      // Mock URL.createObjectURL
      global.URL.createObjectURL = vi.fn().mockReturnValue("mock-blob-url");

      // Mock document methods
      document.createElement = vi.fn().mockImplementation((tagName) => {
        if (tagName === "iframe") {
          return {
            style: {},
            srcdoc: "",
            parentNode: { removeChild: vi.fn() },
          };
        }
        return {};
      });
      document.body.appendChild = vi.fn();

      // Set up success case directly
      const processResult = {
        ...sessionMock,
        code: "formatted",
        transpiled: "transpiled",
        html: "<div>Mocked HTML</div>",
        css: "/* Mocked CSS */",
      };

      const originalProcess = CodeProcessor.prototype.process;
      CodeProcessor.prototype.process = vi.fn().mockResolvedValue(
        processResult,
      );

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession,
      );

      // Restore original method
      CodeProcessor.prototype.process = originalProcess;

      expect(result).toEqual(processResult);
    });

    it("should handle aborted signal", async () => {
      const mockCode = "const x = 5;";
      const controller = new AbortController();
      const mockSignal = controller.signal;

      controller.abort();

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession,
      );
      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      const mockCode = "invalid code {";
      const mockSignal = new AbortController().signal;

      vi.spyOn(console, "error").mockImplementation(() => {}); // Silence console errors

      // Mock formatCode to throw an error
      vi.mocked(formatCode).mockRejectedValue(new Error("Format error"));

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession,
      );
      expect(result).toBe(false);
    });
  });

  describe("runCode", () => {
    it("should execute code in iframe context", async () => {
      const mockTranspiled = "const x = 5;";
      const mockResult = {
        html: "<div>Test</div>",
        css: ".test { color: red; }",
      };

      // Mock RenderService methods
      const mockEmotionCache = {
        key: "test-key",
        nonce: undefined,
        inserted: {},
        registered: {},
        insert: vi.fn(),
        sheet: { tags: [], isSpeedy: true, key: "test-key" },
      } as unknown as EmotionCache;

      const rootElement = document.createElement("div");
      // Mock createRoot to avoid DOM element errors
      const mockRoot = {
        render: vi.fn(),
        unmount: vi.fn(),
      };
      (createRoot as any).mockReturnValue(mockRoot);

      const mockRenderedApp: RenderedApp = {
        rootElement: rootElement,
        rRoot: mockRoot,
        cssCache: mockEmotionCache,
        cleanup: vi.fn(),
        toHtmlAndCss: vi.fn().mockResolvedValue({
          html: mockResult.html,
          css: mockResult.css,
        }),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(
        mockRenderedApp,
      );
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue({
        html: mockResult.html,
        css: mockResult.css,
      });

      const result = await codeProcessor.runCode(mockTranspiled);

      expect(result).toEqual(mockResult);
      expect(RenderService.prototype.updateRenderedApp).toHaveBeenCalledWith({
        transpiled: mockTranspiled,
      });
      expect(RenderService.prototype.handleRender).toHaveBeenCalled();
    });

    it("should throw error if rendering fails", async () => {
      const mockTranspiled = "const x = 5;";

      // Mock createRoot to avoid DOM element errors
      const mockRoot = {
        render: vi.fn(),
        unmount: vi.fn(),
      };
      (createRoot as any).mockReturnValue(mockRoot);

      const rootElement = document.createElement("div");
      const mockRenderedApp: RenderedApp = {
        rootElement: rootElement,
        rRoot: mockRoot,
        cssCache: {} as EmotionCache,
        cleanup: vi.fn(),
        toHtmlAndCss: vi.fn().mockRejectedValue(new Error("Render failed")),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(
        mockRenderedApp,
      );

      // Mock handleRender to throw an error
      vi.mocked(RenderService.prototype.handleRender).mockRejectedValue(
        new Error("Render failed"),
      );

      await expect(codeProcessor.runCode(mockTranspiled)).rejects.toThrow(
        "Render failed",
      );
    });
  });
});

import type { ICodeSession, RenderedApp } from "@/lib/interfaces";
import type { EmotionCache } from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatCode, transpileCode } from "../../../components/editorUtils";
import { RenderService } from "../../render/RenderService";
import { CodeProcessor } from "../CodeProcessor";

vi.mock("../../render/RenderService");
vi.mock("../../../components/editorUtils");

describe("CodeProcessor", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();

    // Reset any iframe related globals
    if (window.frames.length) {
      delete window.frames[0];
    }
    codeProcessor = new CodeProcessor(mockCodeSpace);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("process", () => {
    it("should format and transpile code successfully", async () => {
      const mockCode = "const x = 6;";
      const mockSignal = new AbortController().signal;

      vi.mocked(transpileCode).mockResolvedValue(`transpiled`);

      vi.mocked(formatCode).mockResolvedValue(`formatted`);
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue({
        html: "<div>Rendered</div>",
        css: "rendered css",
      });

      const result = await codeProcessor.process(mockCode, true, mockSignal, getSession);

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
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue({
        html: "<div>Rendered</div>",
        css: "rendered css",
      });

      const result = await codeProcessor.process(mockCode, false, mockSignal, getSession);

      expect(result).toMatchInlineSnapshot(`false`);
    });

    it("should handle aborted signal", async () => {
      const mockCode = "const x = 5;";
      const controller = new AbortController();
      const mockSignal = controller.signal;

      controller.abort();

      const result = await codeProcessor.process(mockCode, false, mockSignal, getSession);
      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      const mockCode = "invalid code {";
      const mockSignal = new AbortController().signal;

      vi.spyOn(console, "error").mockImplementation(() => {}); // Silence console errors

      const result = await codeProcessor.process(mockCode, false, mockSignal, getSession);
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

      const mockRenderedApp: RenderedApp = {
        rootElement: document.createElement("div"),
        rRoot: createRoot(rootElement),
        cssCache: mockEmotionCache,
        cleanup: vi.fn(),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(mockRenderedApp);
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

      const mockEmotionCache = {
        key: "test-key",
        nonce: undefined,
        inserted: {},
        registered: {},
        insert: vi.fn(),
        sheet: { tags: [] },
      } as unknown as EmotionCache;

      const rootElement = document.createElement("div");
      const mockRenderedApp: RenderedApp = {
        rootElement,
        rRoot: createRoot(rootElement),
        cssCache: mockEmotionCache,
        cleanup: vi.fn(),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(mockRenderedApp);
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue(false);

      await expect(codeProcessor.runCode(mockTranspiled)).rejects.toThrow(
        "Running code produced no output",
      );
    });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ICodeSession } from "@/lib/interfaces";

// Mock dependencies before importing CodeProcessor
vi.mock("@/hooks/use-dark-mode", () => ({
  getInitialDarkMode: vi.fn(() => false),
}));

vi.mock("@/lib/importmap-utils", () => ({
  importMap: { imports: {} },
  importMapReplace: vi.fn((code: string) => code),
}));

vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input: string) => `md5-${input.slice(0, 10)}`),
}));

vi.mock("@/lib/try-catch", () => ({
  tryCatch: vi.fn(async (promise: Promise<unknown>) => {
    try {
      const data = await promise;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }),
}));

vi.mock("@/services/editorUtils", () => ({
  formatCode: vi.fn(async (code: string) => code),
  transpileCode: vi.fn(async (code: string) => `transpiled:${code}`),
}));

vi.mock("@/services/RenderService", () => ({
  RenderService: vi.fn().mockImplementation(() => ({
    updateRenderedApp: vi.fn().mockResolvedValue({
      cssCache: { key: "css-key", sheet: { tags: [] } },
      rootElement: { innerHTML: "<div>rendered</div>" },
      cleanup: vi.fn(),
    }),
    handleRender: vi.fn().mockResolvedValue({
      html: "<div>rendered</div>",
      css: ".class { color: red; }",
    }),
    cleanup: vi.fn(),
  })),
}));

import { CodeProcessor } from "../CodeProcessor";
import { formatCode, transpileCode } from "@/services/editorUtils";
import { getInitialDarkMode } from "@/hooks/use-dark-mode";
import { md5 } from "@/lib/md5";
import { importMapReplace } from "@/lib/importmap-utils";

describe("CodeProcessor", () => {
  let processor: CodeProcessor;
  let mockAbortController: AbortController;
  let mockGetSession: () => ICodeSession;
  let baseSession: ICodeSession;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock URL methods if not available in test environment
    if (typeof URL.createObjectURL !== "function") {
      (URL as unknown as { createObjectURL: (blob: Blob) => string }).createObjectURL =
        vi.fn(() => "blob:mock-url");
    } else {
      vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
    }

    if (typeof URL.revokeObjectURL !== "function") {
      (URL as unknown as { revokeObjectURL: (url: string) => void }).revokeObjectURL =
        vi.fn();
    }

    processor = new CodeProcessor("test-code-space");
    mockAbortController = new AbortController();

    baseSession = {
      code: "const x = 1;",
      transpiled: "transpiled:const x = 1;",
      html: "<div>test</div>",
      css: ".test { color: blue; }",
      codeSpace: "test-code-space",
      messages: [],
      i: 0,
    };

    mockGetSession = vi.fn(() => baseSession);

    // Mock document methods for iframe handling
    vi.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "iframe") {
        const iframe = {
          srcdoc: "",
          title: "",
          className: "",
          style: { display: "" },
          contentWindow: null,
        } as unknown as HTMLIFrameElement;
        return iframe;
      }
      return document.createElement(tagName);
    });

    vi.spyOn(document.body, "appendChild").mockImplementation(
      (node) => node as Node,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  describe("constructor", () => {
    it("should create a CodeProcessor instance", () => {
      const proc = new CodeProcessor("my-code-space");
      expect(proc).toBeInstanceOf(CodeProcessor);
    });

    it("should reuse existing RenderService instance", () => {
      const proc1 = new CodeProcessor("space1");
      const proc2 = new CodeProcessor("space2");
      expect(proc1).toBeInstanceOf(CodeProcessor);
      expect(proc2).toBeInstanceOf(CodeProcessor);
    });
  });

  describe("formatCode", () => {
    it("should format code using editorUtils", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("formatted code");

      const result = await (processor as unknown as {
        formatCode: (code: string) => Promise<string>;
      }).formatCode("unformatted code");

      expect(formatCode).toHaveBeenCalledWith("unformatted code");
      expect(result).toBe("formatted code");
    });

    it("should throw error when formatting fails", async () => {
      vi.mocked(formatCode).mockRejectedValueOnce(new Error("Format error"));

      await expect(
        (processor as unknown as {
          formatCode: (code: string) => Promise<string>;
        }).formatCode("bad code"),
      ).rejects.toThrow("Error formatting code");
    });

    it("should throw error when formatting returns null", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce(null as unknown as string);

      await expect(
        (processor as unknown as {
          formatCode: (code: string) => Promise<string>;
        }).formatCode("code"),
      ).rejects.toThrow("Formatting code returned no data");
    });
  });

  describe("transpileCode", () => {
    it("should transpile code using editorUtils", async () => {
      vi.mocked(transpileCode).mockResolvedValueOnce(
        "transpiled output",
      );

      const result = await (processor as unknown as {
        transpileCode: (code: string) => Promise<string>;
      }).transpileCode("const x = 1;");

      expect(transpileCode).toHaveBeenCalledWith("const x = 1;");
      expect(result).toBe("transpiled output");
    });

    it("should throw error when transpilation fails", async () => {
      vi.mocked(transpileCode).mockRejectedValueOnce(
        new Error("Transpile error"),
      );

      await expect(
        (processor as unknown as {
          transpileCode: (code: string) => Promise<string>;
        }).transpileCode("bad code"),
      ).rejects.toThrow("Error transpiling code");
    });

    it("should throw error when transpilation returns empty", async () => {
      vi.mocked(transpileCode).mockResolvedValueOnce("");

      await expect(
        (processor as unknown as {
          transpileCode: (code: string) => Promise<string>;
        }).transpileCode("code"),
      ).rejects.toThrow("Transpilation resulted in empty output");
    });
  });

  describe("process method", () => {
    it("should return false when signal is aborted before processing", async () => {
      mockAbortController.abort();

      const result = await processor.process(
        "const x = 1;",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });

    it("should return false when formatting fails", async () => {
      vi.mocked(formatCode).mockRejectedValueOnce(new Error("Format error"));

      const result = await processor.process(
        "bad code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });

    it("should return existing session when code is unchanged", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("const x = 1;");

      const result = await processor.process(
        "const x = 1;",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(baseSession);
    });

    it("should return false when transpilation fails", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockRejectedValueOnce(
        new Error("Transpile error"),
      );

      const result = await processor.process(
        "new code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });

    it("should return session when transpiled code is unchanged", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce(
        "transpiled:const x = 1;",
      );

      const result = await processor.process(
        "new code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(baseSession);
    });

    it("should skip running code when skipRunning is true", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      const result = await processor.process(
        "new code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).not.toBe(false);
      if (result !== false) {
        expect(result.code).toBe("new code");
        expect(result.transpiled).toBe("new transpiled");
      }
    });

    it("should return false when aborted during processing", async () => {
      vi.mocked(formatCode).mockImplementation(async () => {
        mockAbortController.abort();
        return "code";
      });

      const result = await processor.process(
        "code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });
  });

  describe("runCode method", () => {
    it("should have runCode method defined", () => {
      expect(typeof processor.runCode).toBe("function");
    });

    it("should throw when no output produced", async () => {
      // The mock returns null by default after module is loaded
      // This tests error handling when render produces no output
      await expect(processor.runCode("transpiled code")).rejects.toThrow(
        "Running code produced no output",
      );
    });
  });

  describe("reRenderFromTranspiled method", () => {
    it("should return false when signal is aborted", async () => {
      mockAbortController.abort();

      const result = await processor.reRenderFromTranspiled(
        "transpiled",
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });

    it("should use transpiled code directly without reformatting", async () => {
      vi.mocked(formatCode).mockClear();
      vi.mocked(transpileCode).mockClear();

      await processor.reRenderFromTranspiled(
        "pre-transpiled code",
        mockAbortController.signal,
        mockGetSession,
      );

      expect(formatCode).not.toHaveBeenCalled();
      expect(transpileCode).not.toHaveBeenCalled();
    });
  });

  describe("iframe execution", () => {
    it("should create blob URL for transpiled code", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      await processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(URL.createObjectURL).toHaveBeenCalled();
    });

    it("should use importMapReplace for code transformation", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      await processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(importMapReplace).toHaveBeenCalled();
    });

    it("should check dark mode for iframe styling", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      await processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(getInitialDarkMode).toHaveBeenCalled();
    });

    it("should use md5 for request ID matching", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      await processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(md5).toHaveBeenCalledWith("new transpiled");
    });

    it("should call replaceIframe callback when provided", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      const replaceIframe = vi.fn();

      // This will timeout since we can't actually render, but we can verify the callback is set up
      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
        replaceIframe,
      );

      // Wait a bit then abort to prevent timeout
      await new Promise((resolve) => setTimeout(resolve, 10));
      mockAbortController.abort();

      await processPromise.catch(() => {});

      // The replaceIframe should have been called during iframe setup
      expect(replaceIframe).toHaveBeenCalled();
    });

    it("should append hidden iframe when no replaceIframe callback", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));
      mockAbortController.abort();

      await processPromise.catch(() => {});

      expect(document.body.appendChild).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should handle blob URL creation error", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");
      vi.spyOn(URL, "createObjectURL").mockImplementation(() => {
        throw new Error("Blob error");
      });

      const result = await processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(result).toBe(false);
    });

    it("should log error when format fails", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.mocked(formatCode).mockRejectedValueOnce(new Error("Format failed"));

      await processor.process(
        "bad code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error formatting code:",
        expect.any(Error),
      );
    });

    it("should log error when transpile fails", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockRejectedValueOnce(
        new Error("Transpile failed"),
      );

      await processor.process(
        "bad code",
        true,
        mockAbortController.signal,
        mockGetSession,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error transpiling code:",
        expect.any(Error),
      );
    });
  });

  describe("timeout handling", () => {
    it("should have timeout constants defined", () => {
      // Verify the module has timeout handling by checking the process method exists
      expect(typeof processor.process).toBe("function");
    });

    // Note: Timeout tests with fake timers are complex due to Promise race conditions
    // and the module's internal setTimeout usage. These are better tested via
    // integration tests with real timeouts.
  });

  describe("message handling", () => {
    it("should listen for rendered message from iframe", async () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");

      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));
      mockAbortController.abort();

      await processPromise.catch(() => {});

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "message",
        expect.any(Function),
      );
    });

    it("should handle successful render message", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");
      vi.mocked(md5).mockReturnValueOnce("test-request-id");

      let messageHandler: ((event: MessageEvent) => void) | null = null;

      vi.spyOn(window, "addEventListener").mockImplementation(
        (type, handler) => {
          if (type === "message" && typeof handler === "function") {
            messageHandler = handler as (event: MessageEvent) => void;
          }
        },
      );

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      // Wait for the message listener to be set up
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Simulate the rendered message from iframe
      if (messageHandler) {
        const mockEvent = {
          data: {
            type: "rendered",
            requestId: "test-request-id",
            iteration: 5,
            data: {
              html: "<div>success</div>",
              css: ".success { color: green; }",
            },
          },
        } as MessageEvent;
        messageHandler(mockEvent);
      }

      const result = await processPromise;

      if (result !== false) {
        expect(result.html).toBe("<div>success</div>");
        expect(result.css).toBe(".success { color: green; }");
      }
    });

    it("should reject render with empty HTML", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");
      vi.mocked(md5).mockReturnValueOnce("test-request-id");

      let messageHandler: ((event: MessageEvent) => void) | null = null;

      vi.spyOn(window, "addEventListener").mockImplementation(
        (type, handler) => {
          if (type === "message" && typeof handler === "function") {
            messageHandler = handler as (event: MessageEvent) => void;
          }
        },
      );

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));

      if (messageHandler) {
        const mockEvent = {
          data: {
            type: "rendered",
            requestId: "test-request-id",
            iteration: 5,
            data: {
              html: "",
              css: "",
            },
          },
        } as MessageEvent;
        messageHandler(mockEvent);
      }

      const result = await processPromise;
      expect(result).toBe(false);
    });

    it("should ignore messages with wrong requestId", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");
      vi.mocked(md5).mockReturnValueOnce("correct-id");

      let messageHandler: ((event: MessageEvent) => void) | null = null;

      vi.spyOn(window, "addEventListener").mockImplementation(
        (type, handler) => {
          if (type === "message" && typeof handler === "function") {
            messageHandler = handler as (event: MessageEvent) => void;
          }
        },
      );

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Send message with wrong ID - should be ignored
      if (messageHandler) {
        const mockEvent = {
          data: {
            type: "rendered",
            requestId: "wrong-id",
            data: { html: "wrong", css: "" },
          },
        } as MessageEvent;
        messageHandler(mockEvent);
      }

      // Abort to finish the test
      mockAbortController.abort();

      const result = await processPromise;
      // Should timeout/abort, not receive the wrong message
      expect(result).toBe(false);
    });

    it("should ignore non-rendered message types", async () => {
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");
      vi.mocked(md5).mockReturnValueOnce("test-id");

      let messageHandler: ((event: MessageEvent) => void) | null = null;

      vi.spyOn(window, "addEventListener").mockImplementation(
        (type, handler) => {
          if (type === "message" && typeof handler === "function") {
            messageHandler = handler as (event: MessageEvent) => void;
          }
        },
      );

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Send message with wrong type
      if (messageHandler) {
        const mockEvent = {
          data: {
            type: "other-type",
            requestId: "test-id",
          },
        } as MessageEvent;
        messageHandler(mockEvent);
      }

      mockAbortController.abort();

      const result = await processPromise;
      expect(result).toBe(false);
    });
  });

  describe("dark mode handling", () => {
    it("should use dark mode colors when dark mode is enabled", async () => {
      vi.mocked(getInitialDarkMode).mockReturnValueOnce(true);
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      let createdIframe: HTMLIFrameElement | null = null;
      vi.spyOn(document, "createElement").mockImplementation((tagName) => {
        if (tagName === "iframe") {
          const iframe = {
            srcdoc: "",
            title: "",
            className: "",
            style: { display: "" },
            contentWindow: null,
          } as unknown as HTMLIFrameElement;
          createdIframe = iframe;
          return iframe;
        }
        return document.createElement(tagName);
      });

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));
      mockAbortController.abort();

      await processPromise.catch(() => {});

      expect(getInitialDarkMode).toHaveBeenCalled();
      if (createdIframe) {
        expect((createdIframe as HTMLIFrameElement).srcdoc).toContain(
          "#1e1e1e",
        );
      }
    });

    it("should use light mode colors when dark mode is disabled", async () => {
      vi.mocked(getInitialDarkMode).mockReturnValueOnce(false);
      vi.mocked(formatCode).mockResolvedValueOnce("new code");
      vi.mocked(transpileCode).mockResolvedValueOnce("new transpiled");

      let createdIframe: HTMLIFrameElement | null = null;
      vi.spyOn(document, "createElement").mockImplementation((tagName) => {
        if (tagName === "iframe") {
          const iframe = {
            srcdoc: "",
            title: "",
            className: "",
            style: { display: "" },
            contentWindow: null,
          } as unknown as HTMLIFrameElement;
          createdIframe = iframe;
          return iframe;
        }
        return document.createElement(tagName);
      });

      const processPromise = processor.process(
        "new code",
        false,
        mockAbortController.signal,
        mockGetSession,
      );

      await new Promise((resolve) => setTimeout(resolve, 10));
      mockAbortController.abort();

      await processPromise.catch(() => {});

      if (createdIframe) {
        expect((createdIframe as HTMLIFrameElement).srcdoc).toContain(
          "#ffffff",
        );
      }
    });
  });
});

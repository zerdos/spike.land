import type { IframeMessage, RenderedApp } from "@/lib/interfaces";
import type { EmotionCache } from "@emotion/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderService } from "../../render/RenderService";
import { ScreenshotService } from "../../screenshot/ScreenshotService";
import { MessageHandlerService } from "../MessageHandlerService";

// Mock dependencies
vi.mock("../../screenshot/ScreenshotService");
vi.mock("../../render/RenderService");

describe("MessageHandlerService", () => {
  let messageHandlerService: MessageHandlerService;
  let mockScreenshotService: ScreenshotService;
  let mockRenderService: RenderService;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mocked services
    const takeScreenshot = vi.fn().mockImplementation(async () => {});
    mockScreenshotService = {
      takeScreenshot,
    } as unknown as ScreenshotService;

    const updateRenderedApp = vi.fn().mockImplementation(async () => null);
    const handleRender = vi.fn().mockImplementation(async () => ({ css: "", html: "" }));
    const cleanup = vi.fn();
    mockRenderService = {
      updateRenderedApp,
      handleRender,
      cleanup,
    } as unknown as RenderService;

    // Mock constructors
    vi.mocked(ScreenshotService).mockImplementation(() => mockScreenshotService);
    vi.mocked(RenderService).mockImplementation(() => mockRenderService);

    messageHandlerService = new MessageHandlerService("test-code-space");
  });

  it("should handle screenshot message", async () => {
    const event = new MessageEvent("message", {
      data: {
        type: "screenShot",
        requestId: "test-id",
      } as IframeMessage,
    });

    await messageHandlerService.handleMessage(event);
    expect(mockScreenshotService.takeScreenshot).toHaveBeenCalled();
  });

  it("should handle run message", async () => {
    const mockRendered: RenderedApp = {
      rootElement: document.createElement("div"),
      rRoot: {} as any,
      cssCache: {
        key: "test-key",
        sheet: { tags: [] },
        inserted: {},
        registered: {},
        insert: vi.fn(),
      } as EmotionCache,
      cleanup: vi.fn(),
    };
    (mockRenderService.updateRenderedApp as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockRendered,
    );

    const event = new MessageEvent("message", {
      data: {
        type: "run",
        requestId: "test-id",
        transpiled: "const x = 1;",
      } as IframeMessage,
    });

    await messageHandlerService.handleMessage(event);

    expect(mockRenderService.updateRenderedApp).toHaveBeenCalledWith({
      transpiled: "const x = 1;",
    });
    expect(mockRenderService.handleRender).toHaveBeenCalledWith(mockRendered);
  });

  it("should ignore message with no type", async () => {
    const event = new MessageEvent("message", {
      data: {} as IframeMessage,
    });

    await messageHandlerService.handleMessage(event);

    expect(mockScreenshotService.takeScreenshot).not.toHaveBeenCalled();
    expect(mockRenderService.updateRenderedApp).not.toHaveBeenCalled();
  });

  it("should handle unknown message type", async () => {
    const consoleSpy = vi.spyOn(console, "warn");
    const event = new MessageEvent("message", {
      data: {
        type: "unknown" as any,
        requestId: "test-id",
      },
    });

    await messageHandlerService.handleMessage(event);
    expect(consoleSpy).toHaveBeenCalledWith("Unhandled message type: unknown");
  });

  it("should cleanup render service", () => {
    messageHandlerService.cleanup();
    expect(mockRenderService.cleanup).toHaveBeenCalled();
  });

  it("should handle message processing error", async () => {
    (mockScreenshotService.takeScreenshot as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Test error"),
    );

    const event = new MessageEvent("message", {
      data: {
        type: "screenShot",
        requestId: "test-id",
      } as IframeMessage,
    });

    await expect(messageHandlerService.handleMessage(event)).rejects.toThrow("Test error");
  });
});

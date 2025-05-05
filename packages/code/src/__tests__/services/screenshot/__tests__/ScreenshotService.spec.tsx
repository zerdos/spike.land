import { ScreenshotService } from "@/../services/screenshot/ScreenshotService";
import type { ImageData } from "@/lib/interfaces";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

// Mock dependencies
vi.mock("@/external/html2canvas", () => ({
  default: vi.fn().mockResolvedValue({
    toBlob: (callback: (blob: Blob | null) => void) => {
      callback(new Blob(["test"], { type: "image/png" }));
    },
  } as unknown as HTMLCanvasElement),
}));

vi.mock("@/lib/process-image", () => ({
  processImage: vi.fn().mockResolvedValue({
    imageName: "test-screenshot.png",
    url: "http://test.com/image.png",
    src: "http://test.com/image.png",
    mediaType: "image/png",
    data: "http://test.com/image.png",
  } as ImageData),
}));

describe("ScreenshotService", () => {
  let screenshotService: ScreenshotService;
  let postMessageSpy: ReturnType<typeof vi.spyOn>;
  const mockUUID = "test-uuid";

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

  beforeEach(() => {
    screenshotService = new ScreenshotService("test-code-space");
    postMessageSpy = vi.spyOn(window.parent, "postMessage");
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      mockUUID as `${string}-${string}-${string}-${string}-${string}`,
    );
  });

  it("should take a screenshot and post message with processed image data", async () => {
    await screenshotService.takeScreenshot();

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: "screenshot",
        requestId: mockUUID,
        imageData: {
          imageName: "test-screenshot.png",
          url: "http://test.com/image.png",
          src: "http://test.com/image.png",
          mediaType: "image/png",
          data: "http://test.com/image.png",
        },
      },
      "*",
    );
  });

  it("should handle canvas blob creation failure", async () => {
    // Mock html2canvas to simulate blob creation failure
    const html2canvas = (await import("@/external/html2canvas"))
      .default as Mock;
    html2canvas.mockResolvedValueOnce({
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(null);
      },
    } as unknown as HTMLCanvasElement);

    await expect(screenshotService.takeScreenshot()).rejects.toThrow(
      "Failed to create blob from canvas",
    );
  });

  it("should handle image processing failure", async () => {
    const { processImage } = await import("@/lib/process-image") as {
      processImage: Mock;
    };
    processImage.mockRejectedValueOnce(new Error("Processing failed"));

    await expect(screenshotService.takeScreenshot()).rejects.toThrow();
  });

  it("should create file with correct name and type", async () => {
    const blob = new Blob(["test"], { type: "image/png" });
    const file = screenshotService["createScreenshotFile"](blob);

    expect(file.name).toBe("screenshot-test-code-space.png");
    expect(file.type).toBe("image/png");
  });
});

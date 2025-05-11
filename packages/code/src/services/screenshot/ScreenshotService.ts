import type { IframeMessage, ImageData } from "@/lib/interfaces";
import { processImage } from "@/lib/process-image";
import { tryCatch } from "@/lib/try-catch";

export class ScreenshotService {
  private readonly codeSpace: string;

  constructor(codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  public async takeScreenshot(): Promise<void> {
    const screenshotPromise = async () => {
      const html2canvas = (await import("@/external/html2canvas")).default;
      const canvas = await html2canvas(document.body, { imageTimeout: 100 });

      const blob = await this.canvasToBlob(canvas);
      const file = this.createScreenshotFile(blob);
      const imageData = await processImage(file);
      this.postScreenshotMessage(imageData);
    };

    const { error } = await tryCatch(screenshotPromise());

    if (error) {
      console.error("Error taking screenshot:", error);
      throw error;
    }
  }

  private canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("Failed to create blob from canvas")),
        "image/png",
      );
    });
  }

  private createScreenshotFile(blob: Blob): File {
    return new File([blob], `screenshot-${this.codeSpace}.png`, {
      type: "image/png",
    });
  }

  private postScreenshotMessage(imageData: ImageData): void {
    const message: IframeMessage = {
      type: "screenshot",
      requestId: crypto.randomUUID(),
      imageData,
    };
    window.parent.postMessage(message, "*");
  }
}

import type { IframeMessage } from "@/lib/interfaces";
import { RenderService } from "../render/RenderService";
import { ScreenshotService } from "../screenshot/ScreenshotService";
import type { IMessageHandlerService } from "../websocket/types";

export class MessageHandlerService implements IMessageHandlerService {
  private readonly screenshotService: ScreenshotService;
  private readonly renderService: RenderService;

  constructor(codeSpace: string) {
    this.screenshotService = new ScreenshotService(codeSpace);
    this.renderService = new RenderService(codeSpace);
  }

  public async handleMessage(event: MessageEvent): Promise<void> {
    try {
      const data = event.data as IframeMessage;
      const { type } = data;
      if (!type) return;

      switch (type) {
        case "screenShot":
          await this.screenshotService.takeScreenshot();
          break;
        case "run":
          await this.handleRunMessage(data.transpiled);
          break;
        case "render":
          // Handle render message if needed
          break;
        default:
          console.warn(`Unhandled message type: ${type}`);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      throw error;
    }
  }

  private async handleRunMessage(transpiled: string): Promise<void> {
    const rendered = await this.renderService.updateRenderedApp({ transpiled });
    await this.renderService.handleRender(rendered);
  }

  public cleanup(): void {
    this.renderService.cleanup();
  }
}

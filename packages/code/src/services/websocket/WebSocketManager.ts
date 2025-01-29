import { getCodeSpace } from "@/hooks/use-code-space";
import { init } from "@/lib/tw-dev-setup";
import { DOMError, MessageHandlingError, WebSocketError, getErrorMessage } from "@/lib/errors";
import { CodeSessionBC } from "../CodeSessionBc";
import { MessageHandlerService } from "../message/MessageHandlerService";
import { ServiceWorkerManager } from "../worker/ServiceWorkerManager";
import type { IWebSocketManager } from "./types";

// Route constants
const ROUTES = {
  LIVE: (codeSpace: string) => `/live/${codeSpace}`,
  LIVE_CMS: (codeSpace: string) => `/live-cms/${codeSpace}`,
  DEHYDRATED: (codeSpace: string) => `/live/${codeSpace}/dehydrated`,
} as const;

// Message interfaces
interface MessageData {
  html: string;
  css: string;
  code?: string;
  transpiled?: string;
}

interface RunMessageResult {
  html: string;
  css: string;
}

/**
 * WebSocket manager for handling real-time code synchronization
 * and communication between client and server.
 */
export class WebSocketManager implements IWebSocketManager {
  private readonly codeSpace: string;
  private readonly messageHandler: MessageHandlerService;
  private readonly serviceWorker: ServiceWorkerManager;

  constructor() {
    this.codeSpace = getCodeSpace(location.pathname);
    this.messageHandler = new MessageHandlerService(this.codeSpace);
    this.serviceWorker = new ServiceWorkerManager();
  }

  /**
   * Initializes the WebSocket connection and sets up message handlers
   * @throws {Error} If initialization fails
   */
  public async init(): Promise<void> {
    try {
      await init();

      const cSessBr = new CodeSessionBC(this.codeSpace);
      // const session = await cSessBr.init();

      const currentPath = location.pathname;
      
      if (
        currentPath === ROUTES.LIVE(this.codeSpace) ||
        currentPath === ROUTES.LIVE_CMS(this.codeSpace)
      ) {
        // await this.handleLivePage(cSessBr, session);
      } else if (currentPath === ROUTES.DEHYDRATED(this.codeSpace)) {
        await this.handleDehydratedPage(cSessBr);
      } else {
        await this.handleDefaultPage(cSessBr);
      }

      // Initialize service worker
      setTimeout(() => {
        this.serviceWorker.setup().catch(console.error);
      }, 0);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new WebSocketError(`Failed to initialize WebSocket: ${errorMessage}`, error instanceof Error ? error : undefined);
    }
  }

  /**
   * Handles code transpilation and returns the rendered result
   * @param transpiled - Transpiled code to run
   * @returns Promise resolving to rendered HTML/CSS or false if failed
   */
  public handleRunMessage(transpiled: string): Promise<RunMessageResult | false> {
    return this.messageHandler.handleRunMessage(transpiled);
  }

  // private async handleLivePage(cSessBr: CodeSessionBC, session: ICodeSession): Promise<void> {
  //   const cSess = new Code(this.codeSpace);
  //   await cSess.init(session);
  //   Object.assign(globalThis, { cSess });

  //   cSessBr.sub((sess) => {
  //     const { code, transpiled } = sess;
  //     console.table({ code, transpiled });
  //   });

  //   // const { initializeApp } = await import("@/lib/hydrate");
  //   // await initializeApp();

  //   // const { renderPreviewWindow } = await import("@/lib/hydrate");
  //   // const { AppToRender } = await import("../../AppToRender");
  //   // await renderPreviewWindow({ codeSpace: this.codeSpace, cSess, AppToRender });
  // }

  /**
   * Handles dehydrated page rendering
   * @param codeSessionBC - Code session broadcast channel
   */
  private async handleDehydratedPage(codeSessionBC: CodeSessionBC): Promise<void> {
    const handleDehydratedContent = ({ html, css }: MessageData): void => {
      try {
        const embedElement = document.getElementById("embed");
        if (!embedElement) {
          throw new DOMError("Embed element not found", "embed");
        }
        
        embedElement.innerHTML = `
          <style type="text/css">${css}</style>
          <div>${html}</div>
        `;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error("Error handling dehydrated page:", errorMessage);
        
        if (error instanceof DOMError) {
          throw error;
        }
        throw new WebSocketError(`Failed to handle dehydrated content: ${errorMessage}`);
      }
    };

    codeSessionBC.sub(handleDehydratedContent);
  }

  /**
   * Handles default page message routing
   * @param codeSessionBC - Code session broadcast channel
   */
  private async handleDefaultPage(codeSessionBC: CodeSessionBC): Promise<void> {
    const messageHandler = (data: MessageData): void => {
      try {
        this.messageHandler.handleMessage(new MessageEvent("message", { data }))
          .catch(error => {
            const errorMessage = getErrorMessage(error);
            console.error("Error handling message:", errorMessage);
            throw new MessageHandlingError("Failed to handle message", data);
          });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error("Error in message handler:", errorMessage);
        
        if (error instanceof MessageHandlingError) {
          throw error;
        }
        throw new WebSocketError(`Message handler failed: ${errorMessage}`);
      }
    };

    codeSessionBC.sub(messageHandler);

    // Set up window message handler
    window.onmessage = (event: MessageEvent): void => {
      this.messageHandler.handleMessage(event)
        .catch(error => {
          const errorMessage = getErrorMessage(error);
          console.error("Error handling window message:", errorMessage);
          throw new MessageHandlingError("Failed to handle window message", event.data);
        });
    };
  }

  /**
   * Cleans up resources and event listeners
   */
  public cleanup(): void {
    try {
      this.messageHandler.cleanup();
      window.onmessage = null;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error during cleanup:", errorMessage);
      throw new WebSocketError(`Cleanup failed: ${errorMessage}`);
    }
  }
}

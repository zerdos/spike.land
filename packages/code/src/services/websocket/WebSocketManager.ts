import { getCodeSpace } from "@/hooks/use-code-space";
import { init } from "@/lib/tw-dev-setup";
import { CodeSessionBC } from "../CodeSessionBc";
import { MessageHandlerService } from "../message/MessageHandlerService";
import { ServiceWorkerManager } from "../worker/ServiceWorkerManager";
import type { IWebSocketManager } from "./types";

export class WebSocketManager implements IWebSocketManager {
  private readonly codeSpace: string;
  private readonly messageHandler: MessageHandlerService;
  private readonly serviceWorker: ServiceWorkerManager;

  constructor() {
    this.codeSpace = getCodeSpace(location.pathname);
    this.messageHandler = new MessageHandlerService(this.codeSpace);
    this.serviceWorker = new ServiceWorkerManager();
  }

  public async init(): Promise<void> {
    try {
      await init();

      const cSessBr = new CodeSessionBC(this.codeSpace);
      // const session = await cSessBr.init();

      if (
        location.pathname === `/live/${this.codeSpace}` ||
        location.pathname === `/live-cms/${this.codeSpace}`
      ) {
        // await this.handleLivePage(cSessBr, session);
      } else if (location.pathname === `/live/${this.codeSpace}/dehydrated`) {
        await this.handleDehydratedPage(cSessBr);
      } else {
        await this.handleDefaultPage(cSessBr);
      }

      // Initialize service worker
      setTimeout(() => {
        this.serviceWorker.setup().catch(console.error);
      }, 0);
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
      throw error;
    }
  }

  public handleRunMessage(transpiled: string): Promise<
    {
      html: string;
      css: string;
    } | false
  > {
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

  private async handleDehydratedPage(cSessBr: CodeSessionBC): Promise<void> {
    const handleDehydratedPage = ({ html, css }: { html: string; css: string; }) =>
      document.getElementById("embed")!.innerHTML =
        `<style type="text/css">${css}</style><div>${html}</div>`;

    cSessBr.sub(handleDehydratedPage);
  }

  private async handleDefaultPage(cSessBr: CodeSessionBC): Promise<void> {
    cSessBr.sub((s) => this.messageHandler.handleMessage(new MessageEvent("message", { data: s })));

    window.onmessage = (event: MessageEvent) => {
      this.messageHandler.handleMessage(event).catch(console.error);
    };
  }

  public cleanup(): void {
    this.messageHandler.cleanup();
  }
}

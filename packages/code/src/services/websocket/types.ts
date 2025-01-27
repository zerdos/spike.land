import type { RenderedApp } from "@/lib/interfaces";

export interface IWebSocketManager {
  init(): Promise<void>;
  cleanup(): void;
}

export interface IScreenshotService {
  takeScreenshot(): Promise<void>;
}

export interface IRenderService {
  updateRenderedApp(params: { transpiled: string; }): Promise<RenderedApp | null>;
  handleRender(renderedNew: RenderedApp | null): Promise<{ css: string; html: string; } | false>;
  cleanup(): void;
}

export interface IMessageHandlerService {
  handleMessage(event: MessageEvent): Promise<void>;
}

export interface IServiceWorkerManager {
  setup(): Promise<void>;
}

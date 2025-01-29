import type { renderApp as RenderApp } from "@/lib/render-app";
import "/@/workers/render-app.worker.js";

export const { renderApp } = globalThis as unknown as {
  renderApp: typeof RenderApp;
};

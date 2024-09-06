import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { debounce } from "es-toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import type { IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

export const renderedAPPS = new Map<HTMLElement, RenderedApp>();

// Main render function
async function renderApp(
  { rootElement, codeSpace, transpiled, App, code }: IRenderApp,
): Promise<RenderedApp | null> {
  try {
    const rootEl = rootElement || document.getElementById("embed") as HTMLDivElement || document.createElement("div");
    if (!document.body.contains(rootEl)) {
      rootEl.id = "root";
      document.body.appendChild(rootEl);
    }
    rootEl.id = "root";

    if (renderedAPPS.has(rootEl)) {
      console.warn("Cleaning up existing app before rendering new one.");
      renderedAPPS.get(rootEl)?.cleanup();
      renderedAPPS.delete(rootEl);
    }

    let AppToRender: React.ComponentType<any>;

    if (App) {
      AppToRender = App;
    } else if (transpiled) {
      AppToRender = (await import(createJsBlob(transpiled))).default;
    } else if (codeSpace) {
      const indexJs = `${location.origin}/live/${codeSpace}/index.js`;
      AppToRender = (await import(indexJs)).default;
    } else {
      AppToRender = () => <div>Mock App for Testing</div>;
    }

    const root = createRoot(rootEl);

    const cssCache = createCache({
      key: md5(transpiled! || code! || Math.random().toString()),
      speedy: true,
      container: rootEl.parentNode!,
    });

    const AppWithScreenSize: React.FC = React.memo(function AppWithScreenSize() {
      const [{ width, height }, setDimensions] = useState({ width: rootEl.clientWidth, height: rootEl.clientHeight });

      const debouncedSetDimensions = useCallback(
        debounce(
          (dim: { width: number; height: number }) => setDimensions(dim),
          100,
        ),
        [],
      );

      useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const { width, height } = entry.contentRect;
            debouncedSetDimensions({ width, height });
          }
        });
        resizeObserver.observe(rootEl);
        return () => {
          resizeObserver.disconnect();
          debouncedSetDimensions.cancel();
        };
      }, [debouncedSetDimensions]);

      return <AppToRender width={width} height={height} />;
    });

    root.render(
      <CacheProvider value={cssCache}>
        <ErrorBoundary>
          <AppWithScreenSize />
        </ErrorBoundary>
        {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
      </CacheProvider>,
    );

    const cleanup = () => {
      const renderedApp = renderedAPPS.get(rootEl);
      if (renderedApp) {
        renderedApp.rRoot.unmount();
        const { cssCache } = renderedApp;
        if (cssCache.sheet) {
          cssCache.sheet.flush();
        }
        renderedApp.rootElement.innerHTML = "";
        if (document.body.contains(rootEl)) {
          document.body.removeChild(rootEl);
        }
        renderedAPPS.delete(rootEl);
      }
    };

    const renderedApp: RenderedApp = { rootElement: rootEl, rRoot: root, App, cssCache, cleanup, code };
    renderedAPPS.set(rootEl, renderedApp);

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}

export { renderApp };

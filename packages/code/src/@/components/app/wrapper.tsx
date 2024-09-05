import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
// import { ParentSize } from "@/external/ParentSize";
import type { IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { transpile } from "@/lib/shared";
import createCache from "@emotion/cache";
import { css } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { debounce } from "es-toolkit";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
// import { s } from "vite/dist/node/types.d-aGj9QkWt";
// import { useScreenSize } from '@visx/responsive';
// import { useParentSize } from '@visx/responsive';

// Utility functions
const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

export const renderedAPPS = new Map<HTMLElement, RenderedApp>();

export const Wrapper: React.FC<{ codeSpace?: string; code?: string; transpiled?: string; scale?: number }> = (
  { code, codeSpace, transpiled, scale = 1 },
) => {
  if (codeSpace) {
    return (
      <iframe
        css={css`
            height: 100vh;
            width: 100vw;
            scale: ${1 / scale};
            transform-origin: 0 0;
            border: 0;
            overflow-y: overlay;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          `}
        src={`/live/${codeSpace}/embed`}
      />
    );
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;

    const rootRef = createRoot(containerRef.current!);

    const cssCache = createCache({
      key: md5(code || transpiled || Math.random().toString()),
      speedy: false,
      container: containerRef.current,
    });

    const AppRenderer = React.lazy(async () =>
      import(
        /* @vite-ignore */ createJsBlob(transpiled || await transpile({ code: code!, originToUse: location.origin }))
      )
    );

    rootRef.render(
      <CacheProvider value={cssCache}>
        <React.Suspense fallback={<></>}>
          <ErrorBoundary>
            {/* <ParentSize ref={containerRef}> */}
            <h1>ParentSize -- x</h1>
            <AppRenderer />
            {/* </ParentSize> */}
          </ErrorBoundary>
        </React.Suspense>
      </CacheProvider>,
    );

    return () => {
      rootRef.unmount();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [containerRef, code, transpiled]);

  return (
    <div
      ref={containerRef}
      data-testid="wrapper-container"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
    </div>
  );
};

// Main render function
const renderApp = async (
  { rootElement, codeSpace, transpiled, App, code }: IRenderApp,
): Promise<RenderedApp | null> => {
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
      speedy: false,
      container: rootEl.parentNode!,
    });

    const AppWithScreenSize = () => {
      const [{ width, height }, setDimensions] = useState({ width: rootEl.clientWidth, height: rootEl.clientHeight });

      useEffect(() => {
        // use ResizeObserver to update the dimensions
        const abortController = new AbortController();
        const debouncedSetDimensions = debounce(
          (dim: {
            width: number;
            height: number;
          }) => setDimensions(dim),
          100,
          { signal: abortController.signal },
        );

        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const { width, height } = entry.contentRect;
            debouncedSetDimensions({ width, height });
          }
        });
        resizeObserver.observe(rootEl);
        return () => {
          resizeObserver.disconnect();
          abortController.abort();
        };
      }, []);

      return <AppToRender width={width} height={height} />;
    };

    root.render(
      <>
        <CacheProvider value={cssCache}>
          <ErrorBoundary>
            <AppWithScreenSize />
          </ErrorBoundary>
        </CacheProvider>
        {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
      </>,
    );

    const cleanup = () => {
      const renderedApp = renderedAPPS.get(rootEl)!;
      renderedApp.rRoot.unmount();
      const { cssCache } = renderedApp;
      const { sheet } = cssCache;
      sheet.flush();
      sheet.inserted = {};
      sheet.registered = {};
      cssCache.sheet = null;

      renderedApp.rootElement.innerHTML = "";

      document.body.contains(rootEl) && document.body.removeChild(rootEl);
      renderedAPPS.delete(rootEl);

      rootEl.remove();
    };

    const renderedApp: RenderedApp = { rootElement: rootEl, rRoot: root, App, cssCache, cleanup, code };
    renderedAPPS.set(rootEl, renderedApp);

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
};

export { md5, renderApp };

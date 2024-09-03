import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import type { AppRendererProps, IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { transpile } from "@/lib/shared";
import createCache from "@emotion/cache";
import { css } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// Utility functions
const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

export const renderedAPPS = new Map<HTMLElement, RenderedApp>();

// Components
export const AppRenderer: React.FC<AppRendererProps> = ({ transpiled, code, width, height, top, left }) => {
  const AppToRender = React.lazy(async () =>
    import(
      /* @vite-ignore */ createJsBlob(transpiled || await transpile({ code: code!, originToUse: location.origin }))
    )
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppToRender
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        top={top || 0}
        left={left || 0}
      />
    </React.Suspense>
  );
};

export const Wrapper: React.FC<{ codeSpace?: string; code?: string; transpiled?: string; scale?: number }> = (
  { code, codeSpace, transpiled, scale = 1 },
) => {
  if (codeSpace) {
    return (
      <iframe
        css={css`
            height: ${100 / scale}%;
            width: ${100 / scale}%;
            border: 0;
            overflow: 'scroll';
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

    rootRef.render(
      <ErrorBoundary>
        <CacheProvider value={cssCache}>
          <ParentSize>
            {(props) => <AppRenderer code={code} transpiled={transpiled} {...props} />}
          </ParentSize>
        </CacheProvider>
      </ErrorBoundary>,
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
    />
  );
};

// Main render function
const renderApp = async (
  { rootElement, rRoot, codeSpace, transpiled, App, code }: IRenderApp,
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
      AppToRender = (await import(`/live/${codeSpace}/index.js`)).default;
    } else {
      AppToRender = () => <div>Mock App for Testing</div>;
    }

    const root = rRoot || createRoot(rootEl);

    const cssCache = createCache({
      key: md5(transpiled! || code! || Math.random().toString()),
      speedy: false,
      container: rootEl.parentNode!,
    });

    root.render(
      <ErrorBoundary>
        <CacheProvider value={cssCache}>
          <ParentSize>
            {(props) => <AppToRender {...props} />}
          </ParentSize>
        </CacheProvider>
        {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
      </ErrorBoundary>,
    );

    const cleanup = () => {
      const renderedApp = renderedAPPS.get(rootEl)!;
      root.unmount();
      const { cssCache } = renderedApp;
      const { sheet } = cssCache;
      sheet.flush();
      sheet.inserted = {};
      sheet.registered = {};
      cssCache.sheet = null;

      rootEl.innerHTML = "";

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

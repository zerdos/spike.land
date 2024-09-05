import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { debounce } from "es-toolkit";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import { IframeWrapper } from "@/components/app/iframe-wrapper";
import type { IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { transpile } from "@/lib/shared";
import { cn } from "@/lib/utils";

const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

export const renderedAPPS = new Map<HTMLElement, RenderedApp>();

interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
  scale?: number;
}

const generateDeterministicKey = (input: string): string => {
  const hash = md5(input);
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "_"; // Start with an underscore to ensure it starts with a valid character

  for (let i = 0; i < hash.length; i++) {
    const charCode = hash.charCodeAt(i);
    result += validChars[charCode % validChars.length];
  }

  return result;
};

export const Wrapper: React.FC<WrapperProps> = React.memo(
  function Wrapper({ code, codeSpace, transpiled }: WrapperProps) {
    if (codeSpace) {
      return <IframeWrapper codeSpace={codeSpace} />;
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current === null) return;

      const rootRef: Root = createRoot(containerRef.current);

      const cssCache = createCache({
        key: generateDeterministicKey(code || transpiled || Math.random().toString()),
        speedy: true,
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
              <AppRenderer />
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
    }, [code, transpiled]);

    return (
      <div
        ref={containerRef}
        data-testid="wrapper-container"
        className={cn("w-full h-full")}
      />
    );
  },
);

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
      key: generateDeterministicKey(transpiled! || code! || Math.random().toString()),
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

if (!globalThis.tw) {
  globalThis.tw = import(location.origin + "/tw/tw-chunk-be5bad.js");
}

export { generateDeterministicKey, renderApp };

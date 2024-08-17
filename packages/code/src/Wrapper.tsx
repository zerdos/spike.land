import createCache from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import { md5 } from "./md5";
import { transpile } from "./shared";

const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

interface AppRendererProps {
  transpiled: string;
  width: number;
  height: number;
  top: number;
  left: number;
}

const AppRenderer: React.FC<AppRendererProps> = React.memo(
  ({ transpiled, width, height, top, left }) => {
    const AppToRender = useMemo(() => (
      React.lazy(() => import(createJsBlob(transpiled)))
    ), [transpiled]);

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
  },
);

// Types
interface IRenderApp {
  rootElement?: HTMLDivElement;
  rRoot?: Root;
  App?: React.ComponentType<any>;
  codeSpace?: string;
  transpiled?: string;
  code?: string;
}

interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: React.ComponentType<any>;
  cssCache: ReturnType<typeof createCache>;
  cleanup: () => void;
}

// Global State
if (!Object.hasOwn(globalThis, "renderedAPPS")) {
  Object.assign(globalThis, {
    renderedAPPS: new Map<HTMLElement, RenderedApp>(),
  });
}

const renderedAPPS = (globalThis as unknown as { renderedAPPS: Map<HTMLElement, RenderedApp> }).renderedAPPS;

// Hooks
const useCodeSpace = (codeSpace: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchAndSetCode = async () => {
      try {
        const response = await fetch(`${window.location.origin}/live/${codeSpace}/index.js`);
        const code = await response.text();
        if (!isCancelled) setTranspiled(code);
      } catch (error) {
        console.error("Error fetching code:", error);
        if (!isCancelled) setTranspiled(null);
      }
    };

    fetchAndSetCode();

    return () => {
      isCancelled = true;
    };
  }, [codeSpace]);

  return transpiled;
};

const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const doTranspile = async () => {
      try {
        const result = await transpile({ code, originToUse: window.location.origin });
        if (!isCancelled) setTranspiled(result);
      } catch (error) {
        console.error("Transpilation error:", error);
        if (!isCancelled) setTranspiled(null);
      }
    };

    doTranspile();

    return () => {
      isCancelled = true;
    };
  }, [code]);

  return transpiled;
};

// Components
const Wrapper: React.FC<{ codeSpace?: string; code?: string; transpiled?: string; scale?: number }> = React.memo(
  ({ code, codeSpace, transpiled: t, scale = 1 }) => {
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

    const transpiled = t || (code && useTranspile(code)) || (codeSpace && useCodeSpace(codeSpace));

    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<Root | null>(null);

    const cssCache = useMemo(() => createCache({ key: "css", speedy: false }), []);

    const renderApp = useCallback(() => {
      if (!rootRef.current || !transpiled) return;

      rootRef.current.render(
        <ErrorBoundary>
          <CacheProvider value={cssCache}>
            <ParentSize>
              {(props) => <AppRenderer transpiled={transpiled} {...props} />}
            </ParentSize>
          </CacheProvider>
        </ErrorBoundary>,
      );
    }, [transpiled, cssCache]);

    useEffect(() => {
      if (!containerRef.current || !transpiled) return;

      if (!rootRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }

      renderApp();

      return () => {
        setTimeout(() => {
          rootRef.current?.unmount();
          rootRef.current = null;
        }, 0);
      };
    }, [transpiled, renderApp]);

    return (
      <div
        ref={containerRef}
        css={css`width: 100%; height: 100%;`}
        data-testid="wrapper-container"
      />
    );
  },
);

// Main render function
const renderApp = async (
  { rootElement, rRoot, codeSpace, transpiled, App }: IRenderApp,
): Promise<RenderedApp | null> => {
  try {
    const rootEl = rootElement || document.getElementById("root") as HTMLDivElement || document.createElement("div");
    if (!document.body.contains(rootEl)) {
      rootEl.id = "root";
      document.body.appendChild(rootEl);
    }

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

    const cssCache = createCache({ key: "css", speedy: false });
    const root = rRoot || createRoot(rootEl);

    const cleanup = () => {
      root.unmount();
      rootEl.innerHTML = "";
      renderedAPPS.delete(rootEl);
    };

    root.render(
      <ErrorBoundary>
        <CacheProvider value={cssCache}>
          <ParentSize>
            {(props) => <AppToRender {...props} />}
          </ParentSize>
        </CacheProvider>
      </ErrorBoundary>,
    );

    const renderedApp: RenderedApp = { rootElement: rootEl, rRoot: root, App, cssCache, cleanup };
    renderedAPPS.set(rootEl, renderedApp);

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => Array.from(m.removedNodes).includes(rootEl))) {
        cleanup();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
};

export { md5, renderApp, renderedAPPS, useTranspile, Wrapper };

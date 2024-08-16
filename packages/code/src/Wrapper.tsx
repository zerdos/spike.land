import createCache from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppRenderer, createJsBlob } from "./components/AppRenderer";
import ErrorBoundary from "./components/ErrorBoundary";
import { md5 } from "./md5";
import { transpile } from "./shared";

export { md5 };

if (!Object.hasOwn(globalThis, "renderedAPPS")) {
  Object.assign(globalThis, {
    renderedAPPS: new Map<HTMLElement, RenderedApp>(),
  });
}
export const renderedAPPS = (globalThis as unknown as { renderedAPPS: Map<HTMLElement, RenderedApp> })
  .renderedAPPS;

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

const useCodeSpace = (codeSpace: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const doTranspile = async () => {
      try {
        const code = await fetch(
          window.location.origin + `/live/${codeSpace}/index.js`,
        ).then((res) => res.text());
        // const result = await transpile({
        //   code,
        //   originToUse: window.location.origin,
        // });
        // if (!isCancelled) {
        setTranspiled(code);
        // }
      } catch (error) {
        console.error("Transpilation error:", error);
        if (!isCancelled) {
          setTranspiled(null);
        }
      }
    };

    doTranspile();

    return () => {
      isCancelled = true;
    };
  }, [codeSpace]);

  return transpiled;
};
// Hooks
const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const doTranspile = async () => {
      try {
        const result = await transpile({
          code,
          originToUse: window.location.origin,
        });
        if (!isCancelled) {
          setTranspiled(result);
        }
      } catch (error) {
        console.error("Transpilation error:", error);
        if (!isCancelled) {
          setTranspiled(null);
        }
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
export const Wrapper: React.FC<
  { codeSpace?: string; code?: string; transpiled?: string; scale?: number }
> = React.memo(({ code, codeSpace, transpiled: t, scale = 1 }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      setTimeout(() => {
        setHydrated(true);
      }, 2000);
    }
  }, []);

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
        src={hydrated ? `/live/${codeSpace}/embed` : `/live/${codeSpace}/dehydrated`}
      />
    );
  }

  const transpiled = t || (code && useTranspile(code))
    || (codeSpace && useCodeSpace(codeSpace));
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);

  const cssCache = useMemo(
    () => createCache({ key: "css", speedy: false }),
    [],
  );

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
      // Schedule unmount for the next tick
      setTimeout(() => {
        rootRef.current?.unmount();
        rootRef.current = null;
      }, 0);
    };
  }, [transpiled, renderApp]);

  return (
    <div
      ref={containerRef}
      css={css`
  width: 100%; 
  height: 100%;`}
      data-testid="wrapper-container"
    />
  );
});

// Optimized renderApp function
export const renderApp = async ({
  rootElement,
  rRoot,
  codeSpace,
  transpiled,
  App,
}: IRenderApp): Promise<RenderedApp | null> => {
  try {
    const rootEl = rootElement
      || document.getElementById("root") as HTMLDivElement
      || document.createElement("div");

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
      // Provide a mock component for testing
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

    const renderedApp: RenderedApp = {
      rootElement: rootEl,
      rRoot: root,
      App,
      cssCache,
      cleanup,
    };
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

export { useTranspile };

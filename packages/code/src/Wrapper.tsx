import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createRoot, type Root } from "react-dom/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import { AppRenderer, createJsBlob } from "./components/AppRenderer";
import { transpile } from "./shared";



if (!Object.hasOwn(globalThis, "renderedAPPS")) {
Object.assign(globalThis, { renderedAPPS: new Map<HTMLElement, RenderedApp>() });
}
const renderedAPPS = (globalThis as unknown as {renderedAPPS: Map<HTMLElement, RenderedApp>}).renderedAPPS;

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

// Hooks
const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const doTranspile = async () => {
      try {
        const result = await transpile({ code, originToUse: window.location.origin });
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
export const Wrapper: React.FC<{ code: string }> = React.memo(({ code }) => {
  const transpiled = useTranspile(code);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);

  const cssCache = useMemo(() => createCache({ key: "css", speedy: false }), []);

  const renderApp = useCallback(() => {
    if (!rootRef.current || !transpiled) return;

    rootRef.current.render(
      <CacheProvider value={cssCache}>
        <ParentSize>
          {(props) => <AppRenderer transpiled={transpiled} {...props} />}
        </ParentSize>
      </CacheProvider>
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

  return <div ref={containerRef} data-testid="wrapper-container" />;
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
    const rootEl = rootElement ||
      document.getElementById("root") as HTMLDivElement ||
      document.createElement("div");
    
    if (!document.body.contains(rootEl)) {
      rootEl.id = "root";
      document.body.appendChild(rootEl);
    }

   

    if (renderedAPPS.has(rootEl)) {
      console.warn("Cleaning up existing app before rendering new one.");
      renderedAPPS.get(rootEl)?.cleanup();
      renderedAPPS.delete(rootEl);
    }

    const AppToRender = App || (await import(
      transpiled ? createJsBlob(transpiled) : `/live/${codeSpace}/index.js`
    )).default;

    const cssCache = createCache({ key: "css", speedy: false });
    const root = rRoot || createRoot(rootEl);

    const cleanup = () => {
      root.unmount();
      rootEl.innerHTML = "";
      renderedAPPS.delete(rootEl);
    };

    root.render(
      <CacheProvider value={cssCache}>
        <ParentSize>
          {(props) => <AppToRender {...props} />}
        </ParentSize>
      </CacheProvider>
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
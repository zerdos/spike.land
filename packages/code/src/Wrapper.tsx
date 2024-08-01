import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import { transpile } from "./shared";

// Helper functions
const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState("");

  useEffect(() => {
    transpile({ code, originToUse: window.location.origin }).then(
      setTranspiled,
    );
  }, [code]);

  return transpiled;
};

// Memoized AppRenderer component
const AppRenderer = React.memo(
  (
    { transpiled, width, height, top, left }: {
      transpiled: string;
      width: number;
      height: number;
      top: number;
      left: number;
    },
  ) => {
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

// Optimized Wrapper component
export const Wrapper: React.FC<{ code: string }> = React.memo(({ code }) => {
  const transpiled = useTranspile(code);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !transpiled) return;

    const cssCache = createCache({ key: "css", speedy: false });
    const root = createRoot(containerRef.current);

    root.render(
      <CacheProvider value={cssCache}>
        <ParentSize>
          {(props) => <AppRenderer transpiled={transpiled} {...props} />}
        </ParentSize>
      </CacheProvider>,
    );

    return () => root.unmount();
  }, [transpiled]);

  return <div ref={containerRef} />;
});

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
  rootElement: HTMLDivElement & { align: string };
  code?: string;
  rRoot: Root;
  App?: React.ComponentType<any>;
  cssCache: ReturnType<typeof createCache>;
  cleanup: () => void;
}

declare global {
  var renderedAPPS: Map<HTMLElement, RenderedApp>;
}

// Optimized renderApp function
export const renderApp = async ({
  rootElement,
  rRoot,
  codeSpace,
  transpiled,
  App,
}: IRenderApp): Promise<RenderedApp | null> => {
  try {
    const rootEl = rootElement || document.getElementById("root")
      || document.createElement("div");
    if (!document.body.contains(rootEl)) {
      rootEl.id = "root";
      document.body.appendChild(rootEl);
    }

    globalThis.renderedAPPS = globalThis.renderedAPPS
      || new Map<HTMLElement, RenderedApp>();

    if (globalThis.renderedAPPS.has(rootEl)) {
      console.warn("Cleaning up existing app before rendering new one.");
      globalThis.renderedAPPS.get(rootEl)?.cleanup();
      globalThis.renderedAPPS.delete(rootEl);
    }

    const AppToRender = App
      || await import(
        transpiled ? createJsBlob(transpiled) : `/live/${codeSpace}/index.js`
      ).then((m) => m.default);
    const cssCache = createCache({ key: "css", speedy: false });
    const root = rRoot || createRoot(rootEl);

    const cleanup = () => {
      root.unmount();
      rootEl.innerHTML = "";
      globalThis.renderedAPPS.delete(rootEl);
    };

    root.render(
      <CacheProvider value={cssCache}>
        <ParentSize>
          {(props) => <AppToRender {...props} />}
        </ParentSize>
      </CacheProvider>,
    );

    const renderedApp: RenderedApp = {
      rootElement: rootEl,
      rRoot: root,
      App,
      cssCache,
      cleanup,
    };
    globalThis.renderedAPPS.set(rootEl, renderedApp);

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

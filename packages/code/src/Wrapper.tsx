import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { AppRenderer, createJsBlob } from "./components/AppRenderer";
import { transpile } from "./shared";
import AIAssistantPanel from './components/AIAssistantPanel';

const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState("");

  useEffect(() => {
    transpile({ code, originToUse: window.location.origin }).then(setTranspiled);
  }, [code]);

  return transpiled;
};

export const Wrapper: React.FC<{ code: string }> = React.memo(({ code }) => {
  const transpiled = useTranspile(code);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !transpiled) return;

    const cssCache = createCache({ key: "css", speedy: false });
    const root = createRoot(containerRef.current);

    const renderApp = () => {
      root.render(
        <CacheProvider value={cssCache}>
          <ParentSize>
            {(props) => <AppRenderer transpiled={transpiled} {...props} />}
          </ParentSize>
        </CacheProvider>,
      );
    };

    renderApp();

    return () => {
      root.unmount();
    };
  }, [transpiled]);

  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
  };

  return (
    <div>
      <div ref={containerRef} data-testid="wrapper-container" />
      <button onClick={toggleAIAssistant}>Toggle AI Assistant</button>
      {showAIAssistant && <AIAssistantPanel />}
    </div>
  );
});

export { useTranspile };

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
      || (await import(
        transpiled ? createJsBlob(transpiled) : `/live/${codeSpace}/index.js`
      )).default;
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

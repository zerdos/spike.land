import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import createCache from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AIBuildingOverlay } from "./AIBuildingOverlay";
import ErrorBoundary from "./components/ErrorBoundary";
import { md5 } from "./md5";
import { transpile } from "./shared";

const createJsBlob = (code: string | Uint8Array): string =>
  URL.createObjectURL(new Blob([code], { type: "application/javascript" }));

// Console Output Component
const ConsoleOutput: React.FC<{ logs: Array<{ type: string; message: string }> }> = ({ logs }) => {
  const logContainerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <pre ref={logContainerRef} className="bg-gray-800 text-white p-4 rounded overflow-auto h-full">
      {logs.map((item, index) => (
        <div
          key={index}
          className={`${
            item.type === "error"
              ? "text-red-400"
              : item.type === "warn"
                ? "text-yellow-400"
                : item.type === "info"
                  ? "text-blue-400"
                  : item.type === "debug"
                    ? "text-purple-400"
                    : item.type === "time"
                      ? "text-pink-400"
                      : "text-green-400"
          }`}>
          {item.type === "table" ? (
            <table className='border-collapse border border-gray-600'>
              <tbody>
                {JSON.parse(item.message).map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell: any, cellIndex: number) => (
                      <td key={cellIndex} className='border border-gray-600 p-1'>
                        {JSON.stringify(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            item.message
          )}
        </div>
      ))}
    </pre>
  );
};

interface AppRendererProps {
  asyncApp: FC<{
    console: Partial<Console>;
    width: number;
    height: number;
    top: number;
    left: number;
  }>;
}

const AppRenderer: React.FC<AppRendererProps> = React.memo(
  ({ asyncApp }) => {
    const [consoleOutput, setConsoleOutput] = useState<Array<{ type: string; message: string }>>([]);

    const customConsole = useMemo(() => ({
      log: (...args: any[]) => {
        setConsoleOutput((prev) => [...prev, { type: "log", message: args.join(" ") }]);
      },
      error: (...args: any[]) => {
        setConsoleOutput((prev) => [...prev, { type: "error", message: args.join(" ") }]);
      },
      warn: (...args: any[]) => {
        setConsoleOutput((prev) => [...prev, { type: "warn", message: args.join(" ") }]);
      },
      info: (...args: any[]) => {
        setConsoleOutput((prev) => [...prev, { type: "info", message: args.join(" ") }]);
      },
      debug: (...args: any[]) => {
        setConsoleOutput((prev) => [...prev, { type: "debug", message: args.join(" ") }]);
      },
      table: (data: any) => {
        let tableData;
        if (Array.isArray(data)) {
          tableData = data;
        } else if (typeof data === "object" && data !== null) {
          tableData = [data];
        } else {
          tableData = [{ value: data }];
        }
        setConsoleOutput((prev) => [
          ...prev,
          { type: "table", message: JSON.stringify(tableData) },
        ]);
      },
      clear: () => {
        setConsoleOutput([]);
      },
    }), []);

    const AppToRender = useMemo(() => {
      const AsyncApp = asyncApp;
      const App: FC<{ customConsole: Partial<Console>; width: number; height: number; top: number; left: number }> = ({
        customConsole,
        width,
        height,
        top,
        left,
      }) => (
        <React.Suspense fallback={<div>Loading...</div>}>
          <AsyncApp
            width={width}
            height={height}
            top={top}
            left={left}
            console={customConsole}
          />
        </React.Suspense>
      );
      return App;
    }, [asyncApp, customConsole]);

    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <AppToRender
            customConsole={customConsole}
            top={0}
            height={window.innerHeight}
            left={0}
            width={window.innerWidth * 0.7}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30}>
          <ConsoleOutput logs={consoleOutput} />
        </ResizablePanel>
      </ResizablePanelGroup>
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
        // console.error("Transpilation error:", error);
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

    const cssCache = useMemo(() => createCache({ key: "css", speedy: true }), []);

    const renderApp = useCallback(() => {
      if (!rootRef.current || !transpiled) return;

      rootRef.current.render(
        <ErrorBoundary>
          <CacheProvider value={cssCache}>
            <ParentSize>
              {(props) => <AppRenderer asyncApp={App} {...props} />}
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

    let AppToRender: React.ComponentType<{
      top: number;
      left: number;
      width: number;
      height: number;
      console: Partial<Console>;
    }>;

    if (App) {
      AppToRender = App as unknown as typeof AppRenderer;
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
      rootEl.remove();
    };

    root.render(
      <ErrorBoundary>
        <CacheProvider value={cssCache}>
          <ParentSize>
            {(props) => <AppRenderer asyncApp={AppToRender} {...props} />}
          </ParentSize>
        </CacheProvider>
        {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
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

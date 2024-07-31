import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import { createRoot, Root } from "react-dom/client";
import { createJsBlob } from "./starter";

interface IRenderApp {
  rootElement?: HTMLDivElement;
  rRoot?: Root;
  App?: React.ComponentType<any>;
  codeSpace?: string;
  transpiled?: string;
}

interface RenderedApp {
  rootElement: HTMLDivElement;
  rRoot: Root;
  App?: React.ComponentType<any>;
  cssCache: ReturnType<typeof createCache>;
  cleanup: () => void;
}

declare global {
  var renderedAPPS: Map<HTMLElement, RenderedApp>;
}

export const renderApp = async (
  { rootElement, rRoot, codeSpace, transpiled, App }: IRenderApp,
): Promise<RenderedApp | null> => {
  try {
    // Ensure rootElement exists and is in the DOM
    let rootEl = rootElement;
    if (!rootEl || !document.body.contains(rootEl)) {
      rootEl = document.createElement("div");
      rootEl.id = "root";
      document.body.appendChild(rootEl);
    }

    // Initialize or get the global renderedAPPS map
    globalThis.renderedAPPS = globalThis.renderedAPPS || new Map<HTMLDivElement, RenderedApp>();

    // Check if an app is already rendered to this element
    if (globalThis.renderedAPPS.has(rootEl)) {
      console.warn("An app is already rendered to this element. Cleaning up the existing app before proceeding.");
      const existingApp = globalThis.renderedAPPS.get(rootEl);
      existingApp?.cleanup();
      globalThis.renderedAPPS.delete(rootEl);
    }

    // Import App component
    const AppToRender = App
      || await import(transpiled ? createJsBlob(transpiled) : `/live/${codeSpace}/index.js`).then(module =>
        module.default
      );

    // Create CSS cache
    const cssCache = createCache({ key: "css", speedy: false });

    // Create or use existing root
    const root = rRoot || createRoot(rootEl);

    // Render the App
    root.render(
      <CacheProvider value={cssCache}>
        <ParentSize>
          {({ width, height, top, left }) => (
            <AppToRender
              width={width || window.innerWidth}
              height={height || window.innerHeight}
              top={top || 0}
              left={left || 0}
            />
          )}
        </ParentSize>
      </CacheProvider>,
    );

    // Create a cleanup function
    const cleanup = () => {
      root.unmount();
      if (document.body.contains(rootEl)) {
        rootEl.innerHTML = ""; // Clear the contents of the element
      }
      globalThis.renderedAPPS.delete(rootEl);
    };

    // Create the RenderedApp object
    const renderedApp: RenderedApp = { rootElement: rootEl, rRoot: root, App, cssCache, cleanup };

    // Store the rendered app in the global map
    globalThis.renderedAPPS.set(rootEl, renderedApp);

    // Set up a MutationObserver to watch for removal of the rootEl
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.removedNodes.forEach((node) => {
            if (node === rootEl || rootEl.contains(node)) {
              cleanup();
              observer.disconnect();
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
};

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React, {} from "react";
import { createRoot } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { getCodeSpace } from "@/hooks/use-code-space";
import useWindowSize from "@/hooks/use-window-size";
import type { FlexibleComponentType, IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { importMapReplace } from "./importmap-utils";

let firstRender = true;
const origin = location.origin;

export function AppWithScreenSize(
  { AppToRender }: { AppToRender: FlexibleComponentType; },
) {
  const { width = 0, height = 0 } = useWindowSize();

  return <AppToRender width={width} height={height} />;
}

export const importFromString = async (code: string) => {
  const codeSpace = getCodeSpace(location.pathname);

  // Try the file-based approach first
  try {
    const filePath = `/live-cms/${codeSpace}-${md5(code)}.mjs`;
    await fetch(filePath, {
      method: "PUT",
      headers: {
        "Content-Type": "text/javascript",
      },
      body: importMapReplace(code),
    });
    console.log("File written to", filePath);
    return import(filePath).then((module) => module.default) as Promise<FlexibleComponentType>;
  } catch (error) {
    console.warn("File-based import failed, falling back to blob URL", error);

    // Fall back to blob URL approach
    const createJsBlob = (code: string): string => {
      const processedCode = importMapReplace(
        code.replace("importMapReplace", ""), 
        origin
      ).replace(/from "\/(?!\/)/g, `from "${origin}/`);
      
      return URL.createObjectURL(
        new Blob([processedCode], { type: "application/javascript" })
      );
    };

    let blobUrl = "";
    try {
      blobUrl = createJsBlob(code);
      const module = await import(/* @vite-ignore */ blobUrl);
      return module.default as FlexibleComponentType;
    } catch (blobError) {
      console.error("Blob URL import failed:", blobError);
      throw blobError;
    } finally {
      // Clean up the blob URL to prevent memory leaks
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    }
  }
};

type GlobalWithRenderedApps = typeof globalThis & {
  renderedApps: WeakMap<HTMLElement, RenderedApp>;
};

declare global {
  let renderedApps: WeakMap<HTMLElement, RenderedApp>;
}

(globalThis as GlobalWithRenderedApps).renderedApps =
  (globalThis as GlobalWithRenderedApps).renderedApps ||
  new WeakMap<HTMLElement, RenderedApp>();

async function renderApp(
  { rootElement, codeSpace, transpiled, App, code, root }: IRenderApp,
): Promise<RenderedApp | null> {
  try {
    const rootEl = rootElement ||
      document.getElementById("embed") as HTMLDivElement ||
      document.createElement("div");
    if (!document.body.contains(rootEl)) {
      document.body.appendChild(rootEl);
    }

    let AppToRender: FlexibleComponentType;
    let emptyApp = false;

    if (App) {
      AppToRender = App;
    } else if (transpiled || code) {
      if (
        transpiled?.indexOf("stdin_default") === -1 &&
        code?.indexOf("as default") === -1
      ) {
        emptyApp = true;
        AppToRender = await importFromString(
          "export default ()=><div>Empty App</div>",
        );
      } else {
        let codeToUse = transpiled;

        if (!codeToUse && code) {
          const { transpile } = await import("@/lib/shared");
          const transpiled = await transpile({
            code,
            originToUse: origin,
          });

          codeToUse = transpiled;
        } else if (!codeToUse) {
          console.error("No code to transpile");
          codeToUse = "export default ()=><div>Error: No code to transpile</div>";
        }

        AppToRender = await importFromString(codeToUse);
      }
    } else if (codeSpace) {
      const indexJs = `${origin}/live/${codeSpace}/index.js`;
      const res = await fetch(indexJs);
      if (!res || !res.ok) {
        AppToRender = await importFromString(
          "export default ()=><div>Mock App for Testing</div>",
        );
      } else {
        const codeToUse = await res.text();

        AppToRender = await importFromString(codeToUse);
      }
    } else {
      AppToRender = await importFromString(
        "export default ()=><div>Mock App for Testing</div>",
      );
    }

    const myRoot = root || renderedApps.get(rootEl)?.rRoot ||
      createRoot(rootEl);

    const cacheKey = md5(transpiled || code || Math.random().toString())
      .toLocaleLowerCase().replace(/[0-9]/g, "");
    /// remove the numbers
    // const cacheKeyNoNumbers = cacheKey.replace(/[0-9]/g, '');

    const parentNode = rootEl.parentNode;
    if (!parentNode) {
      console.warn("Parent node is null, using document.body as container");
    }
    
    const cssCache = createCache({
      key: firstRender ? "x" : cacheKey,
      speedy: true,
      container: parentNode || document.body,
    });

    firstRender = false;

    myRoot.render(
      <ThemeProvider>
        <React.Fragment>
          <CacheProvider value={cssCache}>
            {emptyApp
              ? <AppToRender />
              : (
                <ErrorBoundary {...(codeSpace ? { codeSpace } : {})}>
                  <AppWithScreenSize AppToRender={AppToRender} />
                </ErrorBoundary>
              )}
          </CacheProvider>{" "}
          {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
        </React.Fragment>
      </ThemeProvider>,
    );

    (globalThis as GlobalWithRenderedApps).renderedApps.set(rootEl, {
      rootElement: rootEl,
      rRoot: myRoot,
      App: AppToRender,
      cssCache,
      cleanup: () => {
        myRoot.unmount();
        if (cssCache.sheet) {
          cssCache.sheet.flush();
        }
        rootEl.remove();
        (globalThis as GlobalWithRenderedApps).renderedApps.delete(rootEl);
      },
    });

    const renderedApp = (globalThis as GlobalWithRenderedApps).renderedApps.get(
      rootEl,
    );

    if (!renderedApp) {
      console.error("Failed to retrieve rendered app from WeakMap");
      return null;
    }

    console.log("Rendered app:", renderedApp);
    await new Promise((resolve) => setTimeout(resolve, 100));

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}

export { renderApp };

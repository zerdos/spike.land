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
import { transpile } from "@/lib/shared";
import { importMapReplace } from "./importmap-utils";

type GlobalWithRenderedApps = typeof globalThis & {
  renderedApps: WeakMap<HTMLElement, RenderedApp>;
};

const renderedApps = (globalThis as GlobalWithRenderedApps).renderedApps =
  (globalThis as GlobalWithRenderedApps).renderedApps ||
  new WeakMap<HTMLElement, RenderedApp>();

let firstRender = true;
const origin = location.origin;

export function AppWithScreenSize(
  { AppToRender }: { AppToRender: FlexibleComponentType; },
) {
  const { width = 0, height = 0 } = useWindowSize();

  if (!AppToRender) {
    console.error("AppToRender is undefined in AppWithScreenSize");
    return <div>Error: Component could not be loaded</div>;
  }

  return <AppToRender width={width} height={height} />;
}

const createJsBlob = (code: string): string => {
  const processedCode = importMapReplace(
    code.replace("importMapReplace", ""),
    origin,
  ).replace(/from "\/(?!\/)/g, `from "${origin}/`);

  return URL.createObjectURL(
    new Blob([processedCode], { type: "application/javascript" }),
  );
};

export const importFromString = async (code: string) => {
  const codeSpace = getCodeSpace(location.pathname);
  let blobUrl: string | null = null;

  try {
    const createJsBlob = async (code: string): Promise<string> =>
      await createObjectURL(
        new Blob([
          importMapReplace(code.split("importMapReplace").join(""), origin).split(
            `from "/`,
          ).join(
            `from "${origin}/`,
          ),
        ], { type: "application/javascript" }),
      );

    return import(/* @vite-ignore */ await createJsBlob(code)).then((module) =>
      module.default
    ) as Promise<FlexibleComponentType>;
  } catch (error) {
    console.warn("File-based import failed, falling back to blob URL", error);

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
    // Fall back to blob URL approach
  }
};

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

    let AppToRender: FlexibleComponentType | undefined;
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

    // Ensure AppToRender is defined before rendering
    if (!AppToRender) {
      console.error("AppToRender is undefined, using fallback component");
      AppToRender = () => <div>Error: Component could not be loaded</div>;
    }
    let renderedApp = renderedApps.get(rootEl);

    if (!renderedApp) {
      // First time rendering - create a new root
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

      renderedApps.set(rootEl, {
        rootElement: rootEl,
        rRoot: myRoot,
        App: AppToRender,
        cssCache,
        cleanup: () => {
          // Use requestAnimationFrame to ensure we're not unmounting during render
          requestAnimationFrame(() => {
            myRoot.unmount();
            if (cssCache.sheet) {
              cssCache.sheet.flush();
            }
            rootEl.remove();
            renderedApps.delete(rootEl);
          });
        },
      });

      renderedApp = renderedApps.get(rootEl);
    } else {
      // Update existing root with new content
      // Instead of unmounting and creating a new root, update the existing one
      const existingRoot = renderedApp.rRoot;

      // Update the render with new content
      existingRoot.render(
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

      // Update the stored reference with new values
      renderedApps.set(rootEl, {
        ...renderedApp,
        App: AppToRender,
        cssCache,
        cleanup: () => {
          // Use requestAnimationFrame to ensure we're not unmounting during render
          requestAnimationFrame(() => {
            existingRoot.unmount();
            if (cssCache.sheet) {
              cssCache.sheet.flush();
            }
            rootEl.remove();
            renderedApps.delete(rootEl);
          });
        },
      });
    }

    if (!renderedApp) {
      console.error("Rendered app is undefined");
      return null;
    }

    console.log("Rendered app:", renderedApp);

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}

export { renderApp };

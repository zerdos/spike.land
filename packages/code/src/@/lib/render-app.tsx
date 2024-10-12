import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React, {} from "react";
import { createRoot } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import type {
  FlexibleComponentType,
  IRenderApp,
  RenderedApp,
} from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { transpile } from "@/lib/shared";
import { importMapReplace } from "@/lib/importmap-utils";
import { useWindowSize } from "@uidotdev/usehooks";
import { ThemeProvider } from "@/components/ui/theme-provider";

/**
 * Creates an Emotion cache and extracts its styles.
 * @param options - Options for creating the Emotion cache.
 * @returns An object containing the cache and extracted styles.
 */
export function createEmotionCache(
  options?: Parameters<typeof createCache>[0],
) {
  const cache = createCache(options || { key: "css" });

  return {
    cache,
  };
}

const origin = location.origin;

const createJsBlob = (code: string): string =>
  new URL(
    URL.createObjectURL(
      new Blob([
        importMapReplace(code.split("importMapReplace").join(""), origin).split(
          `"/@/`,
        ).join(`"${origin}/@/`).split(`"/live/`).join(`"${origin}/live/`),
      ], { type: "application/javascript" }),
    ),
    location.origin,
  ).toString();

type GlobalWithRenderedApps = typeof globalThis & {
  renderedApps: WeakMap<HTMLElement, RenderedApp>;
};

declare global {
  let renderedApps: WeakMap<HTMLElement, RenderedApp>;
}

(globalThis as GlobalWithRenderedApps).renderedApps =
  (globalThis as GlobalWithRenderedApps).renderedApps ||
  new WeakMap<HTMLElement, RenderedApp>();

// Main render function
async function renderApp(
  { rootElement, codeSpace, transpiled, App, code, prerender = false }:
    IRenderApp,
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
      if (transpiled?.indexOf("stdin_default") === -1) {
        emptyApp = true;
        AppToRender = (await import(
          createJsBlob(
            await transpile({
              code: `export default ()=><div></div>`,
              originToUse: location.origin,
            }),
          )
        )).default;
      } else {
        AppToRender = (await import(
          createJsBlob(
            transpiled ||
              await transpile({ code: code!, originToUse: location.origin }),
          )
        )).default;
      }
    } else if (codeSpace) {
      const indexJs = `${location.origin}/live/${codeSpace}/index.js`;
      AppToRender = (await import(indexJs)).default;
      if (!AppToRender) {
        emptyApp = true;
        AppToRender = (await import(
          createJsBlob(
            await transpile({
              code: `export default ()=><div></div>`,
              originToUse: location.origin,
            }),
          )
        )).default;
      }
    } else {
      AppToRender = () => <div>Mock App for Testing</div>;
    }

    const root = createRoot(rootEl);

    const cssCache = createCache({
      key: md5(transpiled! || code! || Math.random().toString()),
      speedy: prerender ? false : true,
      container: rootEl.parentNode!,
    });

    const AppWithScreenSize: React.FC = React.memo(
      function AppWithScreenSize() {
        const { width, height } = useWindowSize();

        return <AppToRender width={width!} height={height!} />;
      },
    );

    root.render(
      <ThemeProvider>
        <React.Fragment>
          <CacheProvider value={cssCache}>
            {emptyApp
              ? <AppToRender />
              : (
                <ErrorBoundary {...(codeSpace ? { codeSpace } : {})}>
                  <AppWithScreenSize />
                </ErrorBoundary>
              )}
          </CacheProvider>{" "}
          {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
        </React.Fragment>
      </ThemeProvider>,
    );

    (globalThis as GlobalWithRenderedApps).renderedApps.set(rootEl, {
      rootElement: rootEl,
      rRoot: root,
      App: AppToRender,
      cssCache,
      cleanup: () => {
        root.unmount();
        if (cssCache.sheet) {
          cssCache.sheet.flush();
        }
        rootEl.remove();
        (globalThis as GlobalWithRenderedApps).renderedApps.delete(rootEl);
      },
    });

    const renderedApp = (globalThis as GlobalWithRenderedApps).renderedApps.get(
      rootEl,
    )!;

    console.log("Rendered app:", renderedApp);

    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}

export { renderApp };

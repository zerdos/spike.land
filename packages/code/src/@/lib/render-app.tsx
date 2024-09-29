import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { throttle } from "es-toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import type { IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import {transpile} from "@/lib/shared";
import { importMapReplace } from "@/lib/importmap-utils";

const createJsBlob = (code: string): string =>
  new URL(URL.createObjectURL(
    new Blob([importMapReplace(code.split('importMapReplace').join(""), origin).split(`"/@/`).join(`"${origin}/@/`).split(`"/live/`).join(`"${origin}/live/`)], { type: "application/javascript"}) ), location.origin).toString();
    

    
declare global {
  let renderedApps: WeakMap<HTMLElement, RenderedApp>;
}

declare global {
  var renderedApps: WeakMap<HTMLElement, RenderedApp>;
}

globalThis.renderedApps = globalThis.renderedApps || new WeakMap<HTMLElement, RenderedApp>();


// Main render function
async function renderApp(
  { rootElement, codeSpace, transpiled, App, code }: IRenderApp,
): Promise<RenderedApp | null> {
  try {
    const rootEl = rootElement || document.getElementById("embed") as HTMLDivElement || document.createElement("div");
    if (!document.body.contains(rootEl)) {
     // rootEl.id = "root";
      document.body.appendChild(rootEl);
    }
    // rootEl.id = "root";

    let AppToRender: React.ComponentType<any>;
    let emptyApp = false;


    if (App) {
      AppToRender = App;
    } else if (transpiled || code) {
      if (transpiled?.indexOf("stdin_default") === -1) {
        //empty App, export default ()=><div></div>
        emptyApp = true;
        AppToRender = (await import(createJsBlob((await transpile({code: `export default ()=><div></div>`, originToUse:  location.origin}))))).default;
      }else 
      AppToRender = (await import(   createJsBlob(transpiled || await transpile({code: code!, originToUse: location.origin})))).default;
    } else if (codeSpace) {
      const indexJs = `${location.origin}/live/${codeSpace}/index.js`;
      AppToRender = (await import(indexJs)).default;
      if (!AppToRender) {
        emptyApp = true;
        AppToRender = (await import(createJsBlob((await transpile({code: `export default ()=><div></div>`, originToUse:  location.origin}))))).default;
      }
    } else {
      AppToRender = () => <div>Mock App for Testing</div>;
    }

    const root = createRoot(rootEl);

    const cssCache = createCache({
      key: md5(transpiled! || code! || Math.random().toString()),
      speedy: true,
      container: rootEl.parentNode!,
    });

    const AppWithScreenSize: React.FC = React.memo(function AppWithScreenSize() {
      const [dimensions, setDimensions] = useState({ width: innerWidth, height: innerHeight });

      const throttledSetDimensions = useCallback(
        throttle(
          (dim: { width: number; height: number }) => setDimensions(dim),
          100,
        ),
        [],
      );

      useEffect(() => {
        const handleResize = () => throttledSetDimensions({ width: innerWidth, height: innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [throttledSetDimensions]);

      return <AppToRender width={dimensions.width} height={dimensions.height} />;
    });

 root.render(
     <CacheProvider value={cssCache}>
     {emptyApp ? <AppToRender />: <ErrorBoundary {...(codeSpace?{codeSpace}:{})}>
          <AppWithScreenSize />
        </ErrorBoundary>
  }
        {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
      </CacheProvider>,
    );

    renderedApps.set(rootEl, { 
      rootElement: rootEl, 
      rRoot: root, 
      App, 
      cssCache, 
      cleanup: () => {
        root.unmount();
        if (cssCache.sheet) {
          cssCache.sheet.flush();
        }
        rootEl.remove();
        renderedApps.delete(rootEl);
      }
    });

    const renderedApp = renderedApps.get(rootEl)!;



    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}

export { renderApp };

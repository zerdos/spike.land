import { CacheProvider } from "@emotion/react";

import createCache from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { ParentSize } from "@visx/responsive";
import { createJsBlob } from "./starter";

interface IRenderApp {
    rootElement?: HTMLElement;
    rRoot?: ReturnType<typeof createRoot>;  
    codeSpace?: string;
    transpiled?: string;
    code?: string;
    html?: string;
    css?: string;
}

export const renderApp = async ({rootElement, rRoot ,codeSpace, transpiled }: IRenderApp) => {

    if (rRoot) {
        let root = rootElement || document.getElementById("root");
    if (!root) {
      root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    }
  
    rRoot = createRoot(root);
    
   
   
    }

    if (!rRoot) {return}

    const App =  await import( transpiled? createJsBlob(transpiled!):`/live/${codeSpace}/index.js`).then((module) => module.default);
   
    const cssCache = createCache({ key: "css", speedy: false });
  
   
   
    rRoot.render(
      <CacheProvider value={cssCache}>
      <ParentSize>
        {(parent) => <App
          width={parent.width || window.innerWidth}
          height={parent.height || window.innerHeight}
          top={ parent.top || 0 }
          left={ parent.left || 0 }
        />}
          </ParentSize>
      </CacheProvider>
    );

    return {rootElement, rRoot, App, cssCache}; 
};
  
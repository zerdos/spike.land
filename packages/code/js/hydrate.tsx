import { StrictMode } from "react";

import type { Root } from "react-dom/client";

import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import type { ICodeSession } from "session";
import { md5 } from "./md5";

export { md5 };

let r: Root;
let root: HTMLDivElement;

export const hydrate = (codeSpace: string, sess?: ICodeSession) => {
  if (r) r.unmount();
  requestAnimationFrame(async () => {
    let App;
    if (sess) {
      const { i, css, html, transpiled } = sess;
      document.getElementById("root")!.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(`css`);

      App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
    } else {
      const rt = document.getElementById("root");
      const i = rt?.getAttribute("data-i") || 1;
      App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
    }

    root = document.getElementById(codeSpace + "-css") as unknown as HTMLDivElement;

    r = createRoot(root);
    r.render(
      <StrictMode>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div role="alert">
              <div>Oh, no!!!</div>
              <pre>{error.message}</pre>
            </div>
          )}
        >
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  });

  // root = newRoot;
};

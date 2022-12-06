import { StrictMode } from "react";

import { unmountComponentAtNode } from "react-dom";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import type { ICodeSession } from "session";
import { md5 } from "./md5";

export { md5 };

let root: HTMLDivElement;

export const hydrate = async (codeSpace: string, sess?: ICodeSession) => {
  const App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;

  let rootEl: HTMLDivElement;
  if (sess) {
    rootEl = document.createElement("div");
    const { css, html, transpiled } = sess;
    rootEl.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(`css`);
    document.body.appendChild(rootEl);
  } else {
    rootEl = document.getElementById(codeSpace + "-css")!;
  }

  if (root) unmountComponentAtNode(root);
  root = rootEl;

  hydrateRoot(
    rootEl,
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

  // root = newRoot;
};

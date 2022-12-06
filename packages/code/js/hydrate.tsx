import { StrictMode } from "react";

import { unmountComponentAtNode } from "react-dom";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import type { ICodeSession } from "session";
import { md5 } from "./md5";

export {md5}

let root: HTMLDivElement;


export const hydrate = async (codeSpace: string, sess: ICodeSession) => {
  const { i, css, html, transpiled } = sess;
  const App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
  const rootEl = document.createElement("div");
  rootEl.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(`css`);
  document.body.appendChild(rootEl);
  if (root) unmountComponentAtNode(root);
  root = rootEl;

  hydrateRoot(
    rootEl,
    <StrictMode>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh n o</div>
            <pre>{error.message}</pre>
          </div>
        )}
      >
        <App />
      </ErrorBoundary>
    </StrictMode>,
    { identifierPrefix: md5(transpiled) },
  );

  // root = newRoot;
};

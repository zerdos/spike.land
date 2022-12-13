import type { Root } from "react-dom/client";

import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
export { ab2str } from "sab";
import type { ICodeSession } from "session";
import { md5 } from "./md5";

export { md5 };

let r: Root | null;
let root: HTMLDivElement;
let lastI: number;

export const hydrate = async (codeSpace: string, sess?: ICodeSession) => {
  if (sess?.i && sess.i === lastI) return;
  if (r) {
    r.unmount();
    r = null;
  }
  // requestAnimationFrame(async () => {
  let App;
  const rt = document.getElementById("root")!;

  if (sess && sess.i && sess.html && sess.transpiled) {
    const { i, css, html, transpiled } = sess;
    rt?.setAttribute("data-i", String(i));
    rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
      `css`,
    );
  }
  const i = rt?.getAttribute("data-i") || 1;
  lastI = +i;

  App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`))
    .default;

  root = document.getElementById(
    codeSpace + "-css",
  ) as unknown as HTMLDivElement;

  if (!root) {
    document.getElementById("root")!.innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
    root = document.getElementById(
      codeSpace + "-css",
    ) as unknown as HTMLDivElement;
  }
  if (!r) {
    r = createRoot(root);
    r.render(
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh, no!!!</div>
            <pre>{error.message}</pre>
          </div>
        )}
      >
        <App />
      </ErrorBoundary>,
    );
  }
};

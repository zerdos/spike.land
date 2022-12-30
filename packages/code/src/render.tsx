import type { FC } from "react";
import { createRoot } from "react-dom/client";

export const render = async (rootEl: HTMLDivElement, codeSpace: string) => {
  const App: FC<{}> = (await import(
    `${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`
  )).default;
  const root = createRoot(rootEl);
  root.render(<App />);
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
  BC.onmessage = async () => {
    const App: FC<{}> = (await import(
      `${location.origin}/live/${codeSpace}/index.js?refresh=` + Math.random()
    )).default;
    root.render(<App />);
  };
  return root.render(<App />);
};

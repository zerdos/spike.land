import { hydrate, render } from "preact";
import type { FC } from "preact/compat";

export const createRoot = (container: Element) => ({
  render: (App: FC) => render(App, container),
});
export const hydrateRoot = (container: Element, App: FC) =>
  hydrate(App, container);

const defaultExport = {
  createRoot,
  hydrateRoot,
  render,
};

export { render };

export default defaultExport;

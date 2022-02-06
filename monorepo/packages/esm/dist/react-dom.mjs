// src/react-dom.tsx
import { render, hydrate } from "preact";
var createRoot = (container) => ({
  render: (App) => render(App, container)
});
var hydrateRoot = (container, App) => hydrate(App, container);
var defaultExport = {
  createRoot,
  hydrateRoot,
  render
};
var react_dom_default = defaultExport;
export {
  createRoot,
  react_dom_default as default,
  hydrateRoot
};

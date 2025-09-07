import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Import global styles
import "./styles/globals.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
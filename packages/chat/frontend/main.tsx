import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { initializeClerk } from "./lib/clerk";

// Import global styles
import "./styles/globals.css";

// Initialize Clerk before mounting the app
async function startApp() {
  try {
    // Initialize Clerk
    await initializeClerk();

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
  } catch (error) {
    console.error("Failed to initialize app:", error);

    // Fallback: mount app without Clerk initialization
    const rootElement = document.getElementById("root");
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }
  }
}

// Start the application
startApp();
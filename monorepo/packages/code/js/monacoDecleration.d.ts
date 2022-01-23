import type { MonacoEnvironment } from "monaco-editor";

declare global {
  interface Window {
    MonacoEnvironment;
  }
}

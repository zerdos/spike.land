import type monaco from "monaco-editor";

declare module "./monaco.js" {
  const getMonaco: () => monaco;
  const isMobile: () => boolean;
}

import type monaco from "https://unpkg.com/monaco-editor@0.21.2/monaco.d.ts";

declare module "./monaco.js" {
  const getMonaco: () => monaco;
  const isMobile: () => boolean;
}

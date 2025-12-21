import type { EmotionCache } from "@emotion/cache";
import type EmotionReact from "@emotion/react";
import type { FC } from "react";
import type {} from "react-dom";
import type ear from "@emotion/react";

import {} from "monaco-editor";
import type { createRoot as Cr, hydrateRoot as Hr } from "react-dom/client";
import type { SpikeEditorConsoleAPI } from "./@/components/app/monaco/console-api";

declare module "*.html?raw" {
  const content: string;

  export default content;
}
declare global {
  let sharedWorker: SharedWorker;
  let rRoot: ReturnType<typeof Cr>;
  let cssCache: EmotionCache;
  let firstRender: {
    code: string;
    css: string;
    html: string;
  };

  let swVersion: string;
  let apps: { [key: string]: FC<{ appId: string; }>; };
  let eCaches: { [key: string]: EmotionCache; };
  let emotionReact: typeof ear;

  let workerDom: boolean;
  export namespace ReactJSXRuntime {
    export const jsx: typeof EmotionReact.jsx;
  }
  export namespace ReactDOMClient {
    export const createRoot: typeof Cr;
    export const hydrateRoot: typeof Hr;
  }
}

// types.d.ts
declare global {
  interface Window {
    spikeEditor?: SpikeEditorConsoleAPI;
  }
}

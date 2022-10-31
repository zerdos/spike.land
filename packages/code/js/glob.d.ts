import type { EmotionCache } from "@emotion/cache";
import type EmotionReact from "@emotion/react";
import type { FC } from "react";
import type {} from "react-dom";
import type { createRoot as Cr, hydrateRoot as Hr } from "react-dom/client";

declare global {
  const apps: { [key: string]: FC<{ appId: string }> };
  const eCaches: { [key: string]: EmotionCache };
  const emotionReact: typeof EmotionReact;

  export namespace ReactDOMClient {
    export const createRoot: typeof Cr;
    export const hydrateRoot: typeof Hr;
  }
}

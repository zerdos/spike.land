import type { EmotionCache } from "@emotion/cache";
import EmotionReact from "@emotion/react";
import type { FC } from "react";
import type {} from "react-dom";
import ear from "@emotion/react";
import FS from "@isomorphic-git/lightning-fs";
import { RequestInitWithRetry } from "fetch-retry";
import type { createRoot as Cr, hydrateRoot as Hr } from "react-dom/client";
import { ICodeSession } from "./session";

declare global {
  var sharedWorker: SharedWorker;
  var superFetch: (input: RequestInfo, init?: RequestInitWithRetry) => Promise<Response>;
  var firstRender: {
    code: string;
    css: string;
    html: string;
  };
  var session: ICodeSession;
  var assetHash: string;
  var apps: { [key: string]: FC<{ appId: string }> };
  var eCaches: { [key: string]: EmotionCache };
  const emotionReact: typeof ear;

  const workerDom: boolean;
  export namespace ReactJSXRuntime {
    export const jsx: typeof EmotionReact.jsx;
  }
  export namespace ReactDOMClient {
    export const createRoot: typeof Cr;
    export const hydrateRoot: typeof Hr;
  }
}

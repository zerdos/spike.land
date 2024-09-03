import type { EmotionCache } from "@emotion/cache";
import type { Root } from "react-dom/client";

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
  transpiled: string;
};

// Types
export interface AppRendererProps {
  transpiled?: string;
  code?: string;
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface IRenderApp {
  rootElement?: HTMLDivElement;
  rRoot?: Root;
  App?: React.ComponentType<any>;
  codeSpace?: string;
  transpiled?: string;
  code?: string;
}

export interface RenderedApp {
  rootElement: HTMLDivElement;
  code?: string;
  rRoot: Root;
  App?: React.ComponentType<any>;
  cssCache: EmotionCache;
  cleanup: () => void;
}

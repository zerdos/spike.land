import type { EmotionCache } from "@emotion/cache";
import type { Root } from "react-dom/client";

// Types
export interface AppRendererProps {
  transpiled: string;
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

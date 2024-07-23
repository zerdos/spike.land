import type { FC, ReactNode } from "react";
import { ICodeSession } from "./makeSess";
import type { ParentSizeState } from "./ParentSize";
export declare const render: (
  _rootEl: HTMLElement,
  codeSpace: string,
  mApp?: FC<AppProps> | null,
  signal?: AbortSignal | null,
  data?: ICodeSession | null,
) => Promise<void>;
export declare function handleRender(): Promise<void>;
type AppProps = {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  ref?: HTMLDivElement;
  resize?: (state: ParentSizeState) => void;
  children?: ReactNode;
};
export {};

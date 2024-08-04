import type { ReactNode } from "react";

declare module "/live/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}
declare module "/*";

declare var URL: {
  new (url: string | URL, base?: string | URL): URL;
  prototype: URL;
  canParse(url: string | URL, base?: string): boolean;
  createObjectURL(obj: Blob | MediaSource): string;
  revokeObjectURL(url: string): void;
}
declare global {
  interface Window {
    URL: typeof URL;
  }
}
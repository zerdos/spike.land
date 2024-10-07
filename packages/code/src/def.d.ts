import type { ReactNode } from "react";

declare module "/Wrapper.mjs";

declare module "/live/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}
declare module "/*";

declare let URL: {
  new (url: string | URL, base?: string | URL): URL;
  prototype: URL;
  canParse(url: string | URL, base?: string): boolean;
  createObjectURL(obj: Blob | MediaSource): string;
  revokeObjectURL(url: string): void;
};
declare let VI_TEST: string;

declare global {
  interface Window {
    URL: typeof URL;
  }
}

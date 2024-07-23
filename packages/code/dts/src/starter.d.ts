import type { EmotionCache } from "@emotion/cache";
import type { FC } from "react";
import { md5 } from "./md5";
export declare const apps: Record<
    string,
    FC<{
      appId: string;
    }>
  >,
  eCaches: Record<string, EmotionCache>;
export declare function appFactory(transpiled: string): Promise<
  FC<{
    width: number;
    height: number;
    top: number;
    left: number;
  }>
>;
export declare function createJsBlob(code: string | Uint8Array): string;
export declare function createHTML(code: string): string;
export { md5 };

import "es-module-shims";
import type * as Emotion from "@emotion/react";

declare global {
  interface Window {
    emotionReact: typeof Emotion;
  }
}
declare module "esbuild-wasm/esbuild.wasm";
declare module "*.wasm";

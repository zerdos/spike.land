import type { ReactNode } from "react";

declare module "/live/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}

declare module "/npm:/*";

declare module "monaco-editor/esm/vs/basic-languages/typescript/typescript";
declare module "monaco-editor-core/esm/vs/editor/editor.worker";

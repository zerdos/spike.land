// import type * as monaco from "monaco-editor";

/// <reference types="@cloudflare/workers-types" />

// declare module "monaco-editor/esm/vs/editor/editor.main.js" {
//   export const editor: monaco.editor;
// }

export interface CodeEnv extends EventInit {
  CODE: DurableObjectNamespace;
  __STATIC_CONTENT: KVNamespace;
  LIMITERS: DurableObjectNamespace;
}

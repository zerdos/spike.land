import type * as monaco from "monaco-editor";
declare module "__STATIC_CONTENT_MANIFEST" {
  const manifest: { [key: string]: string };
  export default manifest;
}

declare module "monaco-editor/esm/vs/editor/editor.main.js" {
  export const editor: monaco.editor;
}

import type { editor as Editor, languages as Languages, Uri as MonacoUri } from "monaco-editor";
import "/@/workers/monaco-editor.js";

export const {
  editor,
  languages,
  Uri,
} = globalThis as unknown as {
  editor: typeof Editor;
  languages: typeof Languages;
  Uri: MonacoUri;
};

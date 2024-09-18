export { editor, languages, Uri } from "monaco-editor";
import { version } from "monaco-editor/package.json";

export const css = `@import "${location.origin}/monaco-editor@${version}/min/vs/editor/editor.main.css";`;

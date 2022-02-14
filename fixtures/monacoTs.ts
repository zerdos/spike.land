import * as editor from "monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor.js";
import { URI as Uri } from "monaco-editor/esm/vs/base/common/uri.js";
import { languages } from "monaco-editor";

export const monaco = {
  languages: { typescript: languages.typescript },
  editor,
  Uri,
};

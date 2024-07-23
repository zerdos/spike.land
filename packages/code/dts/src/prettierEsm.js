import pluginEstree from "prettier/plugins/estree";
import pluginTypescript from "prettier/plugins/typescript";
import { format } from "prettier/standalone";
export const prettierJs = async (code) => {
  try {
    return await format(code, {
      arrowParens: "always",
      bracketSpacing: true,
      embeddedLanguageFormatting: "auto",
      insertPragma: false,
      bracketSameLine: true,
      jsxSingleQuote: false,
      htmlWhitespaceSensitivity: "strict",
      printWidth: 90,
      proseWrap: "preserve",
      quoteProps: "as-needed",
      requirePragma: false,
      semi: true,
      singleQuote: false,
      tabWidth: 2,
      trailingComma: "all",
      useTabs: false,
      parser: "typescript",
      plugins: [pluginEstree, pluginTypescript],
    });
  } catch (error) {
    if (code === "Types not found") {
      return "export {}";
    }
    console.error("prettier error"), console.error({ err: error, code });
    return code;
  }
};
Object.assign(self, { prettierJs });

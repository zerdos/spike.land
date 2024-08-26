import emotion from "@emotion/css-prettifier";
import type { Options } from "prettier";
import pluginEstree from "prettier/plugins/estree";
import cssParser from "prettier/plugins/postcss";
import pluginTypescript from "prettier/plugins/typescript";
import { format } from "prettier/standalone";

// Helper function to create a string of spaces of a given length
const createSpaceString = (length: number): string => " ".repeat(length);

export const addSomeFixesIfNeeded = (code: string): string => {
  try {
    let [start, ...rest] = code.split("css={css`");
    if (rest.length) {
      if (!code.includes("import { css } from \"@emotion/react\"")) {
        const [first, ...rest] = start.split("\n");
        // insert the import to the 2nd line
        if (first.startsWith("//")) {
          start = [first, "import { css } from \"@emotion/react\";", ...rest].join("\n");
        } else {
          start = ["import { css } from \"@emotion/react\";", first, ...rest].join("\n");
        }
      }
    }
    let prevIndent = (start.split("\n").pop()?.length || 0) + 2;

    let result = [
      start,
      ...rest.map((x) => {
        const [first, second, ...rest] = x.split("`");
        const indent = createSpaceString(prevIndent);
        prevIndent = (second.split("\n").pop()?.length || 0) + 2;

        const indentedFirst = emotion(first)
          .split("\n")
          .map((line: string) => (line.trim() ? indent + "  " + line : line))
          .join("\n");

        return [indentedFirst, second].join(`\n${indent}\``).concat(
          [, ...rest].join("`"),
        );
      }),
    ].join("css={css`\n");

    // Add default export if it's missing and there's no named export
    if (!result.includes("export default") && !result.includes("export const") && !result.includes("const App")) {
      result += "\n\nexport default () => <></>; // Empty default export";
    }

    return result;
  } catch (error) {
    console.error("addSomeFixesIfNeeded error", { error, code });
    return code;
  }
};

const prettierConfig: Options = {
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  insertPragma: false,
  bracketSameLine: true,
  jsxSingleQuote: true,
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
  singleAttributePerLine: true,
  plugins: [pluginEstree, pluginTypescript],
};

export const prettierJs = async (
  code: string,
  toThrow = false,
): Promise<string> => {
  try {
    return await format(addSomeFixesIfNeeded(code), prettierConfig);
  } catch (error) {
    const msg = JSON.stringify({
      message: (error as unknown as { message: string })?.message,
      error,
      code,
    });
    console.error("Prettier error", msg);
    if (toThrow) throw Error(msg);
    if (code === "Types not found") return "export {}";
    return code;
  }
};

export const prettierCss = async (inputCSS: string) =>
  format(inputCSS, {
    parser: "css",
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    singleQuote: false,
    trailingComma: "none",
    plugins: [cssParser],
  });

Object.assign(globalThis, { prettierJs, prettierCss });

import type { Options } from "prettier";
import { format } from "prettier/standalone";
import pluginTypescript from "prettier/plugins/typescript";
import pluginEstree from "prettier/plugins/estree";
import emotion from "@emotion/css-prettifier";

const createSpaceString = (n: number): string => " ".repeat(n);

export const addSomeFixesIfNeeded = (code: string): string => {
  const [start, ...rest] = code.split("css={css`");
  let prevIndent = start.split("\n").pop()?.length || 0 + 2;

  return [
    start,
    ...rest.map((x) => {
      const [first, second] = x.split("`");
      const indent = createSpaceString(prevIndent);
      prevIndent = second.split("\n").pop()?.length || 0 + 2;

      return [
        emotion(first).split("\n")!.map((l: string) => indent + "  " + l).join(
          "\n",
        ),
        second,
      ].join(`\n${indent}\``);
    }),
  ].join("css={css`\n");
};

const prettierConfig: Options = {
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
    console.error("Prettier error", { error, code });
    if (toThrow) throw error;
    if (code === "Types not found") return "export {}";
    return code;
  }
};

Object.assign(self, { prettierJs });

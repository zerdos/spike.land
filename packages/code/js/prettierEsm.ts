import Prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";

export const prettierJs = (code: string) =>
  Prettier.format(code, {
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
    singleQuote: true,
    tabWidth: 2,
    trailingComma: "all",
    useTabs: false,
    parser: "babel-ts",
    plugins: [parserBabel, parserHtml, parserPostcss],
  });

export const prettierCss = (code: string) =>
  Prettier.format(code, {
    parser: "css",
    plugins: [parserPostcss],
  }) as string;
export const prettierHtml = (code: string) =>
  Prettier.format(code, {
    htmlWhitespaceSensitivity: "css",
    parser: "html",
    plugins: [parserHtml, parserPostcss],
  }) as string;

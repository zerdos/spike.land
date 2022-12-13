// import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";

import { format } from "prettier/standalone";
// import parserHtml from "prettier/parser-html";
// import parserPostcss from "prettier/parser-postcss";

// let lastSuccessful: string | null = null;

export const prettierJs = (code: string) => {
  try {
    return format(code, {
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
      parser: "typescript",
      plugins: [parserTypescript /// parserHtml, parserPostcss
      ],
    });
    // return lastSuccessful = current;
  } catch (error) {
    console.error("prettier error"), console.error({ err: error });
    return null;
  }
};

// export const prettierCss = (code: string) =>
//   Prettier.format(code, {
//     parser: "css",
//     plugins: [parserPostcss],
//   });
// export const prettierHtml = (code: string) =>
//   Prettier.format(code, {
//     htmlWhitespaceSensitivity: "css",
//     parser: "html",
//     plugins: [parserHtml, parserPostcss],
//   });

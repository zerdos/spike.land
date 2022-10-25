import Prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
// import parserHtml from "prettier/parser-html";
// import parserPostcss from "prettier/parser-postcss";

let lastSuccessful: string | null = null;

export const prettierJs = (code: string) => {
  try {
    const current = Prettier.format(code, {
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
      plugins: [parserBabel ///parserHtml, parserPostcss
      ],
    });
    return lastSuccessful = current;
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

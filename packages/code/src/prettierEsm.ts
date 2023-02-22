// import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";

import prettier from "prettier/standalone";
// import parserHtml from "prettier/parser-html";
// import parserPostcss from "prettier/parser-postcss";

// let lastSuccessful: string | null = null;

const prettierJs = (code: string) => {
  // return code;
  // console.log(`prettierJS: ${code}`);
  try {
    return prettier.format(code, {
      arrowParens: "always",
      bracketSpacing: true,
      embeddedLanguageFormatting: "auto",
      insertPragma: false,
      // bracketSpacing: true,

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
      plugins: [parserTypescript /// parserHtml, parserPostcss
      ],
    });
    // return lastSuccessful = current;
  } catch (error) {
    if (code === "Types not found") return "export {}";
    console.error("prettier error"), console.error({ err: error, code });

    return code;
  }
};

Object.assign(self, { prettierJs });
export type Prettier = typeof prettierJs;
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

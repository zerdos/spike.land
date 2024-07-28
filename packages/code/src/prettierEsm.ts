// import parserBabel from "prettier/parser-babel";
import pluginTypescript from "prettier/plugins/typescript";
// @ts-ignore
import pluginEstree from "prettier/plugins/estree";
import { format } from "prettier/standalone";
// export type * as Prettier from "prettier/standalone"
// import parserHtml from "prettier/parser-html";
// import parserPostcss from "prettier/parser-postcss";

// let lastSuccessful: string | null = null;

export const prettierJs = async (code: string, toThrow = false) => {
  // return code;
  // console.log(`prettierJS: ${code}`);
  try {
    return await format(code, {
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
      plugins: [pluginEstree, pluginTypescript /// parserHtml, parserPostcss
      ],
    });
    // return lastSuccessful = current;
  } catch (error) {
    if (toThrow) throw error;
    if (code === "Types not found") return "export {}";
    console.error("prettier error"), console.error({ err: error, code });

    return code;
  }
};

Object.assign(self, { prettierJs });

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

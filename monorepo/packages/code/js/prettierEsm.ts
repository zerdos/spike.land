import Prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHtml from "prettier/esm/parser-html.mjs";
import parserPostcss from "prettier/esm/parser-postcss.mjs";


const jsOptions = {
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
  parser:  "babel-ts",
  plugins: [parserBabel, parserHtml, parserPostcss]
}

const htmlOptions ={
  htmlWhitespaceSensitivity: "css",
  parser: "html",
  plugins: [parserHtml, parserPostcss]
}

const cssOptions = {
  parser:  "css",
  plugins: [ parserPostcss]
}

export const prettier = (code: string) =>Prettier.format(code,jsOptions);
export const prettierCss = (code: string) =>Prettier.format(code,cssOptions);
export const prettierHtml = (code: string) =>Prettier.format(code,htmlOptions);


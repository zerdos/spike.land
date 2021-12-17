import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";

export function formatter(code: string) {
  // return code;
  const formatted = prettier.format(code, {
    "arrowParens": "always",
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "bracketSameLine": true,
    "jsxSingleQuote": false,
    "printWidth": 90,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "useTabs": false,
    parser: "babel-ts",
    plugins: [parserBabel, parserHtml],
  });
  return formatted;
}

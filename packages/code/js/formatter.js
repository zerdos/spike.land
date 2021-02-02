import prettier from "https://unpkg.com/prettier@2.2.1/esm/standalone.mjs";
import parserBabel from "https://unpkg.com/prettier@2.2.1/esm/parser-babel.mjs";
import parserHtml from "https://unpkg.com/prettier@2.2.1/esm/parser-html.mjs";

/**
 * @param {string} code
 */
export function formatter(code) {
  try {
    return prettier.format(code, {
      "arrowParens": "always",
      "bracketSpacing": true,
      "embeddedLanguageFormatting": "auto",
      "htmlWhitespaceSensitivity": "css",
      "insertPragma": false,
      "jsxBracketSameLine": true,
      "jsxSingleQuote": false,
      "printWidth": 64,
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
  } catch (e) {
    console.log("PRETTIER ERROR YAY");

    console.log({ e });
    return code;
  }
}

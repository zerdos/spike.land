import prettier from "../node_legacy/standalone.mjs";
import parserBabel from "../node_legacy/parser-babel.mjs";
import parserHtml from "../node_legacy/parser-html.mjs";

/**
 * @param {string} code
 */
export async function formatter(code) {
  const getVersions = (await import("./versions.js")).default;
  const v = getVersions();

  try {
    return prettier.format(code, {
      "arrowParens": "always",
      "bracketSpacing": true,
      "embeddedLanguageFormatting": "auto",
      "htmlWhitespaceSensitivity": "css",
      "insertPragma": false,
      "jsxBracketSameLine": true,
      "jsxSingleQuote": false,
      "printWidth": 80,
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
  } catch {
    return code;
  }
}

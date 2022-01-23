import { expose } from "comlink";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";

/**
 * @param {string} code
 */
function formatter(code) {
  const formatted = prettier.format(code, {
    arrowParens: "always",
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    htmlWhitespaceSensitivity: "css",
    insertPragma: false,
    bracketSameLine: true,
    jsxSingleQuote: false,
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
    plugins: [parserBabel, parserHtml],
  });
  return formatted;
}

self.addEventListener(
  "connect",
  (e) => expose(formatter, e.ports[0]),
);

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    expose(formatter, event.data.port);
  }
});

self.importScripts("https://unpkg.com/comlink@4.3.1/dist/umd/comlink.min.js");

self.importScripts("https://unpkg.com/prettier@2.5.1/standalone.js");
self.importScripts("https://unpkg.com/prettier@2.5.1/parser-babel.js");
self.importScripts("https://unpkg.com/prettier@2.5.1/parser-html.js");

const { prettier, prettierPlugins, Comlink } = self;

/**
 * @param {string} code
 */
function formatter(code) {
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
    plugins: prettierPlugins,
  });
  return formatted;
}

self.addEventListener(
  "connect",
  (e) => Comlink.expose(formatter, e.ports[0]),
);

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    Comlink.expose(formatter, event.data.port);
  }
});

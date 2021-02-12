self.importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");

self.importScripts("https://unpkg.com/prettier@2.2.1/standalone.js");
self.importScripts("https://unpkg.com/prettier@2.2.1/parser-babel.js");
self.importScripts("https://unpkg.com/prettier@2.2.1/parser-html.js");

/**
 * @param {string} code
 */
function formatter(code) {
    try {
      const formatted =  prettier.format(code, {
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
        plugins: self.prettierPlugins,
      });
      return formatted;
    } catch (e) {
      // console.log({ e });
      return code;
    }
  }

self.addEventListener(
  "connect",
  (e) => Comlink.expose(formatter, e.ports[0]),
);

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    Comlink.expose(formatter, event.data.port);
    return;
  }
});

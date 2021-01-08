/**
 * @param {string} code
 */
export async function formatter(code) {
    const getVersions = (await import("./versions.js")).default;
    const v = getVersions();
    const prettier = (await import(`https://unpkg.com/prettier@${v.prettier}/esm/standalone.mjs`))
        .default;
    const parserBabel = (await import(`https://unpkg.com/prettier@${v.prettier}/esm/parser-babel.mjs`))
        .default;
    const parserHtml = (await import(`https://unpkg.com/prettier@${v.prettier}/esm/parser-html.mjs`))
        .default;
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
    }
    catch (_a) {
        return code;
    }
}

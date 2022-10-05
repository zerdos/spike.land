import {
  init_define_process
} from "./chunk-chunk-IA5ZPNWL.mjs";

// ../../../../../Users/z/.yarn/berry/cache/monaco-editor-npm-0.35.0-dev.20221004-2a6d4da92b-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/bicep/bicep.js
init_define_process();
var bounded = (text) => `\\b${text}\\b`;
var identifierStart = "[_a-zA-Z]";
var identifierContinue = "[_a-zA-Z0-9]";
var identifier = bounded(`${identifierStart}${identifierContinue}*`);
var keywords = [
  "targetScope",
  "resource",
  "module",
  "param",
  "var",
  "output",
  "for",
  "in",
  "if",
  "existing"
];
var namedLiterals = ["true", "false", "null"];
var nonCommentWs = `[ \\t\\r\\n]`;
var numericLiteral = `[0-9]+`;
var conf = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: "'''", close: "'''" }
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'", notIn: ["string", "comment"] },
    { open: "'''", close: "'''", notIn: ["string", "comment"] }
  ],
  autoCloseBefore: ":.,=}])' \n	",
  indentationRules: {
    increaseIndentPattern: new RegExp("^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"),
    decreaseIndentPattern: new RegExp("^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$")
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".bicep",
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  symbols: /[=><!~?:&|+\-*/^%]+/,
  keywords,
  namedLiterals,
  escapes: `\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|'|\\\${)`,
  tokenizer: {
    root: [{ include: "@expression" }, { include: "@whitespace" }],
    stringVerbatim: [
      { regex: `(|'|'')[^']`, action: { token: "string" } },
      { regex: `'''`, action: { token: "string.quote", next: "@pop" } }
    ],
    stringLiteral: [
      { regex: `\\\${`, action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: `[^\\\\'$]+`, action: { token: "string" } },
      { regex: "@escapes", action: { token: "string.escape" } },
      { regex: `\\\\.`, action: { token: "string.escape.invalid" } },
      { regex: `'`, action: { token: "string", next: "@pop" } }
    ],
    bracketCounting: [
      { regex: `{`, action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: `}`, action: { token: "delimiter.bracket", next: "@pop" } },
      { include: "expression" }
    ],
    comment: [
      { regex: `[^\\*]+`, action: { token: "comment" } },
      { regex: `\\*\\/`, action: { token: "comment", next: "@pop" } },
      { regex: `[\\/*]`, action: { token: "comment" } }
    ],
    whitespace: [
      { regex: nonCommentWs },
      { regex: `\\/\\*`, action: { token: "comment", next: "@comment" } },
      { regex: `\\/\\/.*$`, action: { token: "comment" } }
    ],
    expression: [
      { regex: `'''`, action: { token: "string.quote", next: "@stringVerbatim" } },
      { regex: `'`, action: { token: "string.quote", next: "@stringLiteral" } },
      { regex: numericLiteral, action: { token: "number" } },
      {
        regex: identifier,
        action: {
          cases: {
            "@keywords": { token: "keyword" },
            "@namedLiterals": { token: "keyword" },
            "@default": { token: "identifier" }
          }
        }
      }
    ]
  }
};
export {
  conf,
  language
};

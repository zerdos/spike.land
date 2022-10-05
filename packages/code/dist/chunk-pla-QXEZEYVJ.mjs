import {
  init_define_process
} from "./chunk-chunk-IA5ZPNWL.mjs";

// ../../../../../Users/z/.yarn/berry/cache/monaco-editor-npm-0.35.0-dev.20221004-2a6d4da92b-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pla/pla.js
init_define_process();
var conf = {
  comments: {
    lineComment: "#"
  },
  brackets: [
    ["[", "]"],
    ["<", ">"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "[", close: "]" },
    { open: "<", close: ">" },
    { open: "(", close: ")" }
  ],
  surroundingPairs: [
    { open: "[", close: "]" },
    { open: "<", close: ">" },
    { open: "(", close: ")" }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".pla",
  brackets: [
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "<", close: ">", token: "delimiter.angle" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  keywords: [
    ".i",
    ".o",
    ".mv",
    ".ilb",
    ".ob",
    ".label",
    ".type",
    ".phase",
    ".pair",
    ".symbolic",
    ".symbolic-output",
    ".kiss",
    ".p",
    ".e",
    ".end"
  ],
  comment: /#.*$/,
  identifier: /[a-zA-Z]+[a-zA-Z0-9_\-]*/,
  plaContent: /[01\-~\|]+/,
  tokenizer: {
    root: [
      { include: "@whitespace" },
      [/@comment/, "comment"],
      [
        /\.([a-zA-Z_\-]+)/,
        {
          cases: {
            "@eos": { token: "keyword.$1" },
            "@keywords": {
              cases: {
                ".type": { token: "keyword.$1", next: "@type" },
                "@default": { token: "keyword.$1", next: "@keywordArg" }
              }
            },
            "@default": { token: "keyword.$1" }
          }
        }
      ],
      [/@identifier/, "identifier"],
      [/@plaContent/, "string"]
    ],
    whitespace: [[/[ \t\r\n]+/, ""]],
    type: [{ include: "@whitespace" }, [/\w+/, { token: "type", next: "@pop" }]],
    keywordArg: [
      [
        /[ \t\r\n]+/,
        {
          cases: {
            "@eos": { token: "", next: "@pop" },
            "@default": ""
          }
        }
      ],
      [/@comment/, "comment", "@pop"],
      [
        /[<>()\[\]]/,
        {
          cases: {
            "@eos": { token: "@brackets", next: "@pop" },
            "@default": "@brackets"
          }
        }
      ],
      [
        /\-?\d+/,
        {
          cases: {
            "@eos": { token: "number", next: "@pop" },
            "@default": "number"
          }
        }
      ],
      [
        /@identifier/,
        {
          cases: {
            "@eos": { token: "identifier", next: "@pop" },
            "@default": "identifier"
          }
        }
      ],
      [
        /[;=]/,
        {
          cases: {
            "@eos": { token: "delimiter", next: "@pop" },
            "@default": "delimiter"
          }
        }
      ]
    ]
  }
};
export {
  conf,
  language
};

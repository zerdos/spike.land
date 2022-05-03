import { transform } from "@babel/standalone";

export const babelTransform = async (code: string) =>
  (transform(
    code,
    {
      compact: false,
      sourceType: "module",
      comments: false,

      presets: [
        [
          "react",
          {
            "runtime": "automatic", // defaults to classic,
            "development": false,
            "importSource": "@emotion/react", // defaults to react (only in automatic runtime)
          },
        ],
        ["typescript", { isTSX: true, jsxPragma: "jsx", allExtensions: true }],
      ],
    },
  )).code || "";

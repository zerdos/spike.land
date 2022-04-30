import { transform } from "@babel/standalone";

export const babelTransform = async (code: string) =>
  (transform(
    `
    /** @jsxImportSource @emotion/react */
    ` + code,
    {
      compact: false,
      sourceType: "module",
      comments: false,

      presets: [
        "react",
        ["typescript", { isTSX: true, jsxPragma: "jsx", allExtensions: true }],
      ],
    },
  )).code || "";

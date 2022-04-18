import { transform } from "@babel/standalone";

export const babelTransform = async (code: string) =>
  (transform(
    `/** @jsx jsX */
    import { jsx as jsX } from "@emotion/react";
    ` + code,
    {
      compact: false,
      sourceType: "module",
      comments: false,

      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  )).code || "";

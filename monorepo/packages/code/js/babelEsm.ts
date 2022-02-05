import { transform } from "@babel/standalone";

export const babelTransform = (code: string) =>
  transform(
    `/** @jsx jsX */
    import { jsx as jsX } from "@emotion/react";
    ` + code,
    {
      compact: false,
      comments: false,
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;

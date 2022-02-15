import { transform } from "@babel/standalone";

export const babelTransform = (code: string) =>
  transform(
    `/** @jsx jsX */
    import { jsx as jsX } from "@emotion/react";
    ` + code,
    {
      compact: false,
      getModuleId: (str) => `myapp-${str}`,

      comments: false,
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;

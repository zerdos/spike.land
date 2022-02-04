import { transform } from "@babel/standalone";

export const babelTransform = (code: string) =>
  transform(
    code,
    {
      compact: false,
      comments: false,
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;

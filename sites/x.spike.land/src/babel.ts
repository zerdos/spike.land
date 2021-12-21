import { transform } from "@babel/standalone";

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      return this.replace(str, newStr);
    }

    return this.replace(new RegExp(str, "g"), newStr);
  };
}

// const searchRegExp2 = /import.*from '/gi;
// const replace2 = "import Fab from 'https://cdn.skypack.dev/";

// const searchRegExp = /import.*react';/gi;
// const searchRegExpMotion = /import.*framer-motion';/gi;

// const replaceWith = "\n\n";

export const babelTransfo = (code: string) => {
  const safeCode = code;

  const transformed = transform(
    safeCode,
    {
      compact: false,
      comments: false,
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;

  return transformed;
};
